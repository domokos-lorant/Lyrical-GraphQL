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
import { User, UserDocument } from './models/user';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import { IVerifyOptions, VerifyFunction } from 'passport-local';
const webpackConfig = require('../webpack.config');

const app = express();
app.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

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

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser<UserDocument, string>((user, done) => {
   done(null, user.id);
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
   User.findById(id, null, null, (err, user) => {
      done(err, user);
   });
});

// Instructs Passport how to authenticate a user using a locally saved email
// and password combination.  This strategy is called whenever a user attempts to
// log in.  We first find the user model in MongoDB that matches the submitted email,
// then check to see if the provided password matches the saved password. There
// are two obvious failure points here: the email might not exist in our DB or
// the password might not match the saved one.  In either case, we call the 'done'
// callback, including a string that messages why the authentication process failed.
// This string is provided back to the GraphQL client.
const verify: VerifyFunction = (
   email: string, 
   password: string, 
   done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
   User.findOne({ email: email.toLowerCase() }, null, null, (err, user) => {
      if (err) {
         return done(err);
      }

      if (!user) {
         return done(null, false, { message: 'Invalid Credentials' });
      }

      user.comparePassword(password, (err, isMatch) => {
         if (err) {
            return done(err);
         }

         if (isMatch) {
            return done(null, user);
         }

         return done(null, false, { message: 'Invalid Credentials' });
      });
   });
};
passport.use(new GraphQLLocalStrategy(verify as any));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
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
   context: ({ req, res }) => buildContext({ req, res })
});
server.applyMiddleware({ app });

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