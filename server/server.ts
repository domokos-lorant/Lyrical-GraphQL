import express, { Request } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer } from "apollo-server-express";
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import schema from "./schema";
import { MONGO_URI } from '../connectionString';
import path from "path";
import session from 'express-session';
import MongoStore from "connect-mongo";
import passport from "passport";
import { buildContext } from 'graphql-passport';
import {v4 as uuid} from "uuid";
import { initializePassport } from './services/auth';
const webpackConfig = require('../webpack.config');

// Configure Mongo.
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

initializePassport();

const app = express();
app.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
   genid: (req) => uuid(),
   cookie: {secure: false},
   resave: true,
   saveUninitialized: true,
   secret: 'aaabbbccc',
   store: new MongoStore({
     mongoUrl: MONGO_URI,
     mongoOptions: { 
        autoReconnect: true
     }
   })
 }));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Configure Apollo Server.
const server = new ApolloServer({
   schema,
   context: ({ req, res }) => buildContext({ req, res }),
   playground: {
      settings: {
         'request.credentials': 'same-origin',
      },
   },
});
server.applyMiddleware({ app, cors: false });

// Other middleware.
app.use(bodyParser.json());
let compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, 
   {
      publicPath: webpackConfig.output.publicPath, 
      stats: { colors: true }
   }
));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

export default app;