const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

const signUpRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const jamSessionRouter = require('./routes/jamSession');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../client')))
// in production mode, need to serve bundle file in build folder? 

//may be necessary for production
// app.get('/', (req, res) => {
//     res.status(200).send(path.resolve(__dirname, '../client/index.html'));
// })

// define route handlers
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

const CONNECTION_URL = '';
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

module.exports = app;


