import { IResolvers } from "graphql-tools";
import { Lyric, Song } from '../models';

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: IResolvers = {
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

 export default resolvers;