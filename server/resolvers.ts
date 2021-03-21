import { GraphQLResolveInfo } from 'graphql';
import { LyricalPassportContext } from '../schema/LyricalPassportContext';
import { Maybe, MutationAddLyricToSongArgs, MutationAddSongArgs, MutationDeleteSongArgs, MutationLikeLyricArgs, MutationLoginArgs, MutationSignupArgs, QueryLyricArgs, QuerySongArgs, Resolvers } from '../schema/__generated__/schema.all';
import { Lyric, Song } from './models';
import { LyricDocument } from './models/lyric';
import { SongDocument } from './models/song';
import { login, signup } from './services/auth';

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
      },
      async user(_parent: {}, _args: {}, context: LyricalPassportContext) {
         console.log(JSON.stringify(context.req.cookies));
         console.log(context.isAuthenticated());
         return context.user;
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
      },
      async signup(_parent: {}, {email, password}: MutationSignupArgs, context: LyricalPassportContext) {
         return signup({email, password, context});
      },
      async logout(_parent: {}, _args: {}, context: LyricalPassportContext) {
         const { user } = context;
         //const user = context.getUser();
         // console.log(JSON.stringify(user));
         // console.log(JSON.stringify(context));
         context.logout();
         return user;
      },
      async login(_parent: {}, {email, password}: MutationLoginArgs, context: LyricalPassportContext) {
         return login({email, password, context});
      },
   }
};

export default resolvers;