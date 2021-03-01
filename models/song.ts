import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

const SongSchema = new Schema<Document<any> & { lyrics: any }>({
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

SongSchema.statics.addLyric = function(id, content) {
  const Lyric = mongoose.model<Document<any> & { likes: number }>('lyric');

  return this.findById(id)
    .then(song => {
      const lyric = new Lyric({ content, song });
      song!.lyrics.push(lyric);
      return Promise.all([lyric.save(), song!.save()])
        .then(([lyric, song]) => song);
    });
}

SongSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song!.lyrics);
}

export const Song: any = mongoose.model('song', SongSchema);
