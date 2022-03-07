const path = require('path');
const JamSession = require('../models/jamSessionModel.js');
//const bcrypt = require('bcryptjs');

const jamSessionController = {};

jamSessionController.createJamSession = (req, res, next) => {
  const hostId = req.body;
  const songList = {};
  // req to start jam session: user with user._id makes post req - set hostId to user._id
  if (!hostId) return next({log:'Missing hostId in jamSessionController.createUser'});
  JamSession.create({hostId: hostId, songList: songList}, (err, jamSession) =>{
    if (err){
      return next({
        log: 'Error in jamSessionController.createJamSession',
        status: 400,
        message: { err: 'An error occurred :/' },
      });
    }
    else{
      res.locals.jamSession = jamSession;
      return next(); 
    }
  }) 
}
// check guest? yes -> next()
// check host? yes -> oAuth

module.exports = jamSessionController;