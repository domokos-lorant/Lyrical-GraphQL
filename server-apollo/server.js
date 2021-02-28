const express = require('express');
const models = require('../models');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ApolloServer } = require("apollo-server-express");
const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');
const { loadSchemaSync } = require('@graphql-tools/load');
const { addResolversToSchema } = require('@graphql-tools/schema');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { join } = require('path');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb+srv://lorantd:study@lyrical-graphql.hqgdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());

const schema = loadSchemaSync(join(__dirname, './typeDefs.graphql'), {
   loaders: [
       new GraphQLFileLoader()
   ]
});

// const schema5 = await loadSchema('./src/**/*.graphql', { // load from multiple files using glob
//    loaders: [
//        new GraphQLFileLoader()
//    ]
// });

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
   Query: {
     songs(parent, args) {
      return Song.find({});
     },
     song(parent, { id }) {
      return Song.findById(id);
     },
     lyric(parent, { id }) {
      return Lyric.findById(id);
     }
   },
   Mutation: {
     addSong(parent, { title }) {
      return (new Song({ title })).save();
     },
     addLyricToSong(parent, { content }) {
      return Song.addLyric(songId, content);
     },
     likeLyric(parent, { id }) {
      return Lyric.like(id);
     },
     deleteSong(parent, { id }) {
      return Song.remove({ _id: id });
     }
   }
 };

 const schemaWithResolvers = addResolversToSchema({
   schema,
   resolvers,
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({schema: schemaWithResolvers});
server.applyMiddleware({ app });

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

console.log(`GraphQL path: ${server.graphqlPath}`);

module.exports = app;
