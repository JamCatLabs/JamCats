//const fs = require('fs');
const path = require('path');
// const user = require();
const db = require('../models/accountModels.js');
const { Pool } = require('pg');


const authController = {};

authController.createAccount = async (req, res, next) => {
  const params = [req.body.username, req.body.password, req.body.email];
  const text = `INSERT INTO accounts (username, password, email)
  VALUES ($1, $2, $3)`
  try{
    const result = await db.query(text, params)
    console.log('success');
  }
  catch (error) {
    return next({
      log: `Error occurred in insertSprint: ${error}`,
      status: 500,
      message: 'An error occurred in insertSprint. Check log.'
    });
  }  
  
  
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