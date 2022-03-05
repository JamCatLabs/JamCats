const express = require('express');

const authController = require('../controllers/authController.js');
const app = require('../server');

const signupRouter = express.Router();

// get request to show the sign up page
// signUpRouter.get('/signUp', (req, res) => {
//   return res.status(200).sendFile()
// })

// post req to create new account
signupRouter.post('/', authController.createAccount(), (err, res) => {

})  


module.exports = signupRouter;
