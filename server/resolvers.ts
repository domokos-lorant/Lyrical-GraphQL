import { MutationAddLyricToSongArgs, MutationAddSongArgs, MutationDeleteSongArgs, MutationLikeLyricArgs, QueryLyricArgs, QuerySongArgs, Resolvers } from '../schema/__generated__/schema.all';
import { Lyric, Song } from './models';

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
   Query: {
      songs() {
         return Song.find({});
      },
      song(_parent: {}, { id }: QuerySongArgs) {
         return Song.findById(id);
      },
      lyric(parent: {}, { id }: QueryLyricArgs) {
         return Lyric.findById(id);
      }
   },
   Song: {
      // Todo: fix Model typings and use here.
      lyrics(parent: any) {
         return Song.findLyrics(parent._id);
      },
   },
   Lyric: {
      song(parent: any) {
         return Lyric.findById(parent._id).populate('song')
          .then((lyric: any) => {
            console.log(lyric)
            return lyric.song
          });
      }
   },
   Mutation: {
      addSong(_parent: {}, { title }: MutationAddSongArgs) {
         return (new Song({ title })).save();
      },
      addLyricToSong(_parent: {}, { songId, content }: MutationAddLyricToSongArgs) {
         return Song.addLyric(songId, content);
      },
      likeLyric(_parent: {}, { id }: MutationLikeLyricArgs) {
         return Lyric.like(id);
      },
      deleteSong(parent: {}, { id }: MutationDeleteSongArgs) {
         return Song.remove({ _id: id });
      }
   }
};

export default resolvers;