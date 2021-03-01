import express from 'express';
import { Lyric, Song } from '../models';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer } from "apollo-server-express";
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

// const Lyric: any = mongoose.model('lyric');
// const Song: any = mongoose.model('song');

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
     songs(_parent: any, _args: any) {
      return Song.find({});
     },
     song(_parent: any, { id }: any) {
      return Song.findById(id);
     },
     lyric(parent: any, { id }: any) {
      return Lyric.findById(id);
     }
   },
   Mutation: {
     addSong(parent: any, { title }: any) {
      return (new Song({ title })).save();
     },
     addLyricToSong(parent: any, { songId, content }: any) {
      return Song.addLyric(songId, content);
     },
     likeLyric(parent: any, { id }: any) {
      return Lyric.like(id);
     },
     deleteSong(parent: any, { id }: any) {
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


app.use(webpackMiddleware(webpack(webpackConfig)));

console.log(`GraphQL path: ${server.graphqlPath}`);

export default app;