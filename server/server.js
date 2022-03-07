const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
// const fetch = require('node-fetch');
import fetch from 'node-fetch';

const PORT = 3000;

const signUpRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const jamSessionRouter = require('./routes/jamSession');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // {extended: true} stops urlencoded from being deprecated
app.use(cookieParser());

// serve all the static files within the client folder, images
app.use(express.static(path.join(__dirname, '../client')));
// in production mode, need to serve bundle file in build folder? 

// need to 


// serve the index.html file for the homepage
app.get('/', (req, res) => {
  res.status(200).send(path.resolve(__dirname, '../client/index.html'));
});



// login with spotify
const client_id = '205cd69007284821ada5a5f0cad50e05';
const client_secret = 'ff4e4cb06fa74c9c8199716bb7d86df4';


// define route handlers
// app.use('/oauth', async (req, res) => {
//   const authOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type' : 'application/x-www-form-urlencod',
//       'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
//     },
//     body: 'grant_type=client_credentials'
//   };
//   try {
//     const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
//     const data = await response.json();
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// })

app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/jamSession', jamSessionRouter);








// Catch all request to unknown routes
app.use('*',(req, res) => res.status(404).send('404: Page Not Found :/'));

// Global error handler to catch any middleware error
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {console.log(`Server listening on ${PORT}`)});

// const CONNECTION_URL = 'mongodb+srv://Mia:1q2w3e@mongodb1.jaqwf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// mongoose.connect(CONNECTION_URL)
//   .then(() => app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`)))
//   .catch((error) => console.log('asdjfkldkfjakl', error.message));

module.exports = app;


