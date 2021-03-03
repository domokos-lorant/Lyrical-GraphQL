import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer } from "apollo-server-express";
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import schema from "./schema";
import { MONGO_URI } from '../connectionString';
import path from "path";
const webpackConfig = require('../webpack.config');

const app = express();
app.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

// Configure Mongo.
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

// Configure Apollo Server.
const server = new ApolloServer({schema});
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