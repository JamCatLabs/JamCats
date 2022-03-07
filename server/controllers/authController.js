const path = require('path');
const User = require('../models/userModels.js');
const bcrypt = require('bcryptjs');


const authController = {};

authController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return next({log:'Missing username or password in authController.createUser'});

  User.create({ username: username, password: password }, (err, user) => {
    if (err) {
      return next({
        log: 'Error in authController.createUser',
        status: 400,
        message: { err: 'An error occurred' },
      })
    }
    else {
      res.locals.user = user;
      return next();
    }
  })
} 


authController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return next({ log: 'Missing username or password in authController.verifyUser' });
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      // database error
      return next('Error in authController.verifyUser: ' + JSON.stringify(err));
    }
    else if (!user) {
      // no user was found
      res.redirect('/signup');
    }
    else {
      // user was found, compare the password to the hashed one
      bcrypt.compare(password, user.password)
        .then(result => {
          if (!result) {
            // password did not match
            res.redirect('/signup')
          }
          else {
            // password did match, save user for following middlewars
            res.locals.user = user;
            return next()
          }
        })
        .catch(err => {
          // error while bcrypt was running
          return next('Error in authController.verifyUser: ' + JSON.stringify(err))
        })
    }
  })
}

module.exports = authController;