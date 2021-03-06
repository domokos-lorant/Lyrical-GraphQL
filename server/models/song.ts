import mongoose, { Document, Model } from 'mongoose';
import { Lyric, LyricAttributes, LyricDocument } from './lyric';
const Schema = mongoose.Schema;

export interface SongAttributes {
   title: string
   lyrics: LyricDocument[];
}

export interface SongDocument extends SongAttributes, Document<string> {}

interface SongModel extends Model<SongDocument> {
   addLyric(id: string, content: string): SongDocument;
   findLyrics(id: string): LyricDocument[];
}

const SongSchema = new Schema<SongDocument, SongModel>({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric'
  }]
});

SongSchema.statics.addLyric = function(id: string, content: string): Promise<SongDocument | undefined> {
  //const Lyric = mongoose.model<Document<any> & { likes: number }>('lyric');
  return this.findById(id)
    .then(song => {
       if (song) {
         const lyric = new Lyric({ content, song });
         song.lyrics.push(lyric);
         return Promise.all([lyric.save(), song.save()])
           .then(([_lyric, song]) => song);
       }
    });
}

SongSchema.statics.findLyrics = function(id: string): Promise<LyricDocument[] | undefined> {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song?.lyrics);
}

export const Song = mongoose.model<SongDocument, SongModel>('song', SongSchema);
