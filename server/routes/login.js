const express = require('express');
const path = require('path');
const authController = require('../controllers/authController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');
const app = require('../server'); // do we need this here? cs 3/6
const fileController = require('../controllers/'); // do we need this here?

const loginRouter = express.Router();

// get request to serve the login page (login.html)
loginRouter.get('/login', (req, res) => {
  return res.status(200).send(path.resolve(__dirname, '../../client/login.html'));
})

// post req to login
loginRouter.post('/', authController.verifyUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  res.redirect('/dashboard'); // dashboard or whatever we call the homepage
})  

module.exports = loginRouter;