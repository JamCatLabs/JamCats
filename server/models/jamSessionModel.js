const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const Song = require('./songModel.js');


const jamSessionSchema = new Schema({
  hostId: { type: String, required: true, unique: true },
  guests: { type: Object, required: false },
  songList: { type: [Song.songSchema], required: true } //not too sure
  //{type: Array, required: true}

});

module.exports = mongoose.model('JamSession', jamSessionSchema);
