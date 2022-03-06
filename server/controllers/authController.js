//const fs = require('fs');
const path = require('path');
const User = require('../models/userModels.js');

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

authController.loginAccount = async (req, res, next) => {
  // const params = [req.body.username, req.body.password, req.body.email];
  // const text = `INSERT INTO accounts (username, password, email)
  // VALUES ($1, $2, $3)`
  // try{
  //   const result = await db.query(text, params)
  //   console.log('success');
  // }
  // catch (error) { 
  //   return next({ 
  //     log: `Error occured in createAccount: ${error}`
  //   });
  // }
  
}



// ?? Is this right?
module.exports = authController;