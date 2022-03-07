const express = require('express');
const path = require('path');
const querystring = require('query-string');
const authController = require('../controllers/authController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');
const fetch = require('node-fetch');

const loginRouter = express.Router();

// get request to serve the login page (login.html)
loginRouter.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../../client/login.html'));
})

// login with username/password
loginRouter.post('/', authController.verifyUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  res.redirect('/dashboard'); // dashboard or whatever we call the homepage
})


const client_id = '205cd69007284821ada5a5f0cad50e05';
const redirect_uri = 'http://localhost:8080/login/callback';

// request to get authorization from user so our app can access Spotify resources in behalf of that user
loginRouter.get('/oauth', function(req, res) {

  const state = Math.random().toString(36).slice(2);
  const scope = 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-private playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public user-read-currently-playing user-read-email';
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});
// once request is processed, user will see authorization dialog asking to authorize access within the scope that is specified
// once user accepts or denies access, user is redirected to the specified redirect_uri

loginRouter.get('/callback', async function (req, res) {
  
  // callback contains two query params: code = an auth code that can be exchanged for an Access Token, state = value of state param supplied in request
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect('/login' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    const authOptions = {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(client_id + ":" + process.env.CLIENT_SECRET),
      },
      json: true,
    };
    // after comparing state, now the user is ready to exchange the auth code for an Access Token by making a post request to /api/token
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );

    const data = await response.json();
    return res.status(200).json(data);
    // access tokens are deliberately set to expire after a short time, after which new tokens may be granted by supplying the refresh token obtained from the response in the auth code exchange above
    // now that the user has the access token, user can make requests to Spotify API
  }
});

module.exports = loginRouter;

