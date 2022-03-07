const express = require('express');
const path = require('path');
const authController = require('../controllers/authController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');

const loginRouter = express.Router();

// get request to serve the login page (login.html)
loginRouter.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../../client/login.html'));
})

// login with username/password
loginRouter.post('/', authController.verifyUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  res.redirect('/dashboard'); // dashboard or whatever we call the homepage
})  


module.exports = loginRouter;