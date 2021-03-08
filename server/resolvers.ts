import { Maybe, MutationAddLyricToSongArgs, MutationAddSongArgs, MutationDeleteSongArgs, MutationLikeLyricArgs, QueryLyricArgs, QuerySongArgs, Resolvers } from '../schema/__generated__/schema.all';
import { Lyric, Song } from './models';
import { LyricDocument } from './models/lyric';
import { SongAttributes, SongDocument } from './models/song';

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
   Query: {
      async songs() {
         return Song.find({});
      },
      async song(_parent: {}, { id }: QuerySongArgs) {
         return Song.findById(id);
      },
      async lyric(parent: {}, { id }: QueryLyricArgs) {
         return Lyric.findById(id);
      }
   },
   Song: {
      async lyrics(parent: SongDocument): Promise<Maybe<LyricDocument[]>> {
         return Song.findLyrics(parent?._id || "");
      },
   },
   Lyric: {
      async song(parent: LyricDocument) {
         return Lyric.findById(parent._id)
            .populate('song')
            .then((lyric) => {
               return lyric?.song
            });
      }
   },
   Mutation: {
      async addSong(_parent: {}, { title }: MutationAddSongArgs) {
         return (new Song({ title })).save();
      },
      async addLyricToSong(_parent: {}, { songId, content }: MutationAddLyricToSongArgs) {
         return Song.addLyric(songId, content);
      },
      async likeLyric(_parent: {}, { id }: MutationLikeLyricArgs) {
         return Lyric.like(id);
      },
      async deleteSong(_parent: {}, { id }: MutationDeleteSongArgs) {
         return Song.remove({ _id: id });
      }
   }
};

export default resolvers;