const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// after 30 sec, the session will automatically be removed from the collection

// when do we want the session to expire?
const sessionSchema = new Schema({
  // cookieId is equal the to the value of the cookie named ssid (which is equal to the user's id)
  // for testing purposes, set expires to 30s. but later we want to change expires prop such that session persists for however long host chooses
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: String, expires: 30, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
