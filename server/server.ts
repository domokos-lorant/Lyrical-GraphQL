import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer } from "apollo-server-express";
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import schema from "./schema";
import { MONGO_URI } from '../connectionString';
const webpackConfig = require('../webpack.config.js');

const app = express();

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
app.use(webpackMiddleware(webpack(webpackConfig)));

export default app;