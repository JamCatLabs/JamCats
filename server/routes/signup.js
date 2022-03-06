const express = require('express');
const path = require('path');
const authController = require('../controllers/authController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');
const app = require('../server');

const signupRouter = express.Router();

// get request to serve the signup page (signup.html)
signupRouter.get('/signup', (req, res) => {
  return res.status(200).send(path.resolve(__dirname, '../../client/signup.html'));
})

// post req to create new user
signupRouter.post('/', authController.createUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  res.redirect('/dashboard');
})  


module.exports = signupRouter;
