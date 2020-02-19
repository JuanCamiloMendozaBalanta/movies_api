const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userShema = new Schema({
  user: { type: String, required: [true, 'user is necesary'], trim: true },
  movie: { type: String, required: [true, 'movie is necesary'], trim: true },
  score: {
    type: Number,
    minimum: 0,
    maximum: 5
  },
  comment: {
    type: String
  }
});

module.exports = mongoose.model('usermovies', userShema);
