const path = require('path');
const JamSession = require('../models/jamSessionModel.js');
//const bcrypt = require('bcryptjs');

const jamSessionController = {};

jamSessionController.createJamSession = (req, res, next) =>{
  const { hostId, songList } = req.body;
  if (!hostId || !songList) return next({log:'Missing hostId or songList in jamSessionController.createUser'});
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
    }
  }) 
}


module.exports = jamSessionController;