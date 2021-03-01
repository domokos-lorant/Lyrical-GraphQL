import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

LyricSchema.statics.like = function(id) {
  const Lyric = mongoose.model<Document<any> & { likes: number }>('lyric');

  return Lyric.findById(id)
    .then(lyric => {
      ++lyric!.likes;
      return lyric!.save();
    })
}

export const Lyric: any = mongoose.model('lyric', LyricSchema);
