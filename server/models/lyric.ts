import mongoose, { Document } from 'mongoose';
import { Model } from 'mongoose';
import { SongAttributes, SongDocument } from './song';
const Schema = mongoose.Schema;

export interface LyricAttributes {
   content: string;
   likes: number;
   song: SongDocument;
}

export interface LyricDocument extends LyricAttributes, Document<string> {}

interface LyricModel extends Model<LyricDocument> {
   like(id: string): LyricDocument;
}

const LyricSchema = new Schema<LyricDocument, LyricModel>({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

LyricSchema.statics.like = function(id: string): Promise<LyricDocument | undefined> {
  //const Lyric = mongoose.model<Document<any> & { likes: number }>('lyric');
  return Lyric.findById(id)
    .then(lyric => {
       if (lyric) {
         ++lyric.likes;
         return lyric.save();
       }
    })
}

export const Lyric = mongoose.model<LyricDocument, LyricModel>('lyric', LyricSchema);
