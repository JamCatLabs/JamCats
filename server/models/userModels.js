const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'JamCats'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

/**
* Hint: Why is bcrypt required here?
*/
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // jamSessionHistory: {type: Object, required: false},
});

// pre-save hook is middleware that will run before the save to the collection happens
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    // within this context, 'this' refers to the document about to be save
    // document will have properties username, password, jamSessionHistory
    if (err) return next(err);
    this.password = hash;
    return next();
  })
});

module.exports = mongoose.model('User', userSchema);
