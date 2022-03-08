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

const redirect_uri = (process.env.NODE_ENV === "development") ? 'http://localhost:8080/login/callback' : 'http://localhost:3000/login/callback'
const stateKey = 'spotify_auth_state'

// request to get authorization from user so our app can access Spotify resources in behalf of that user
loginRouter.get('/oauth', function(req, res) {
  const randomString = Math.random().toString(36).slice(2)
  res.cookie(stateKey, randomString)
  const scope = 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-private playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public user-read-currently-playing user-read-email';
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: randomString,
      })
  );
});
// once request is processed, user will see authorization dialog asking to authorize access within the scope that is specified
// once user accepts or denies access, user is redirected to the specified redirect_uri

loginRouter.get('/callback', async function (req, res) {
  console.log('hello from callback!')
  // callback contains two query params: code = an auth code that can be exchanged for an Access Token, state = value of state param supplied in request
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/login' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey)
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
          "Basic " + btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET),
      },
      json: true,
    };
    // after comparing state, now the user is ready to exchange the auth code for an Access Token by making a post request to /api/token
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );

    const data = await response.json();
    const access_token = data.access_token;
    const refresh_token = data.refresh_token;
    res.cookie('spotify_access_token', access_token, {secure: true, httpOnly: true})
    res.cookie('spotify_refresh_token', refresh_token, {secure: true, httpOnly: true})
    res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
    // access tokens are deliberately set to expire after a short time, after which new tokens may be granted by supplying the refresh token obtained from the response in the auth code exchange above
    // now that the user has the access token, user can make requests to Spotify API
  }
});

loginRouter.get('/refresh_token', async function(req, res) {

  const refresh_token = req.query.refresh_token;
  const authOptions = {
    method: "POST",
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      code: refresh_token
    }),
    json: true
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );

  const data = await response.json();
  if (!data.error && data.status === 200) {
    const access_token = data.access_token;
    const refresh_token = data.refresh_token;
    //update the accesses tokens inside of the cookies
    res.cookie('spotify_access_token', access_token, {secure: true, httpOnly: true})
    res.cookie('spotify_refresh_token', refresh_token, {secure: true, httpOnly: true})
    res.status(200).json({ 'access_token': access_token})
  }
  return res.status(200).json(data);
});

module.exports = loginRouter;

