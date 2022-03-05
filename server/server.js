const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, '../client')))
// in production mode, need to serve bundle file in build folder? 

//may be necessary for production
// app.get('/', (req, res) => {
//     res.status(200).send(path.resolve(__dirname, '../client/index.html'));
// })


// Catch all request to unkown routes
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

// const CONNECTION_URL = '';
// mongoose.connect(CONNECTION_URL)
//     .then(() => app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`)))
//     .catch((error) => console.log(error.message));

module.exports = app;


