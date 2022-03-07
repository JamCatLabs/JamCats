const express = require('express');
const path = require('path');
const authController = require('../controllers/authController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');
const jamSessionController = require('../controllers/jamSessionController.js');

const jamSessionRouter = express.Router();

// post req to create new jam session
// user creates jam session. verify that request cookie with browser session. if the session cookie iD matches the cookie ssid, user is authenticate and is allowed to remain in session
jamSessionRouter.post('/', jamSessionController.createJamSession, authController.verifyUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  res.redirect('/dashboard'); // dashboard or whatever we call the homepage
})  


// // get request for when they click on "join as guest" to display the current session
// jamSessionRouter.get('/', (req, res) => {
//   return res.status(200).sendFile(path.resolve(__dirname, '../../client/jamSession.html'));
// })


// add guests
// hosts/guests can add songs - add songs to the songLIst on the jamSession schema




module.exports = jamSessionRouter;