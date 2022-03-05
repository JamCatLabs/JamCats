// const { Pool } = require('pg');

// const PG_URI = 'postgres://rglojtko:GQ0hfpq2Tl5Ds2pVI179usPc6BsQsSiB@jelani.db.elephantsql.com/rglojtko';

// // create a new pool here using the connection string above
// const pool = new Pool({
//   connectionString: PG_URI
// });


// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   }
// };

const mongoose = require('mongoose');

// template for schema
const studentSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  age: {type: Number, required: true},
});
const Student = mongoose.model('student', studentSchema)
// You must export your model through module.exports
// The collection name should be 'student'
module.exports = Student;
