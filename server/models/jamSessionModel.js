const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('Song');

// const Song = new Schema({
//     songName: { type: String, required: true},
//     songArtist: { type: String, required: true }
//   });

const jamSessionSchema = new Schema({
  hostId: { type: String, required: true, unique: true },
  guests: { type: Object, required: false },
  songList: { songs: [Song.songSchema], required: true } 
  //{type: Array, required: true}

});

module.exports = mongoose.model('JamSession', jamSessionSchema);
