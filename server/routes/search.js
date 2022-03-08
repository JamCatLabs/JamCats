const express = require('express');
const path = require('path');
const querystring = require('query-string');
const authController = require('../controllers/authController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const { request } = require('http');


const searchRouter = express.Router();
searchRouter.use(cookieParser());



// request to get authorization from user so our app can access Spotify resources in behalf of that user
searchRouter.get('/', async function (req, res) {
  const { spotify_access_token, spotify_refresh_token } = req.cookies;
  const { searchString } = req.query;
  console.log(req.cookies)
  console.log(req.query)

  const searchQuery = querystring.stringify({
    q: searchString,
    type: 'track'
  });

  const searchOption = {
    header: {
      Authorization: 'Bearer ' + spotify_access_token
    }
  }
  const response = await fetch(
    "https://api.spotify.com/v1/search?" + searchQuery, searchOption
  );
    
  const data = await response.json();
    
  if (data.error.status === 401) {
    // if response from Spotify gives an error with status = 401, token has expired
    // invoke refresh_token middleware to get new access token
    res.redirect('/login/refresh_token' +
            querystring.stringify({
              refresh_token: spotify_refresh_token
            }));
    // store refreshed tokens inside of the res.locals.tokens
    res.locals.access_token = req.cookies.spotify_access_token;
    res.locals.refresh_token = req.cookies.spotify_refresh_token;
    //const { access_token, refresh_token } = res.locals.tokens; 
    // update tokens inside of the cookies ===> updated inside of the /refresh_token 
   
        
    // create an option object with the refreshed token
    const searchOptionRefresh = {
      header: {
        Authorization: 'Bearer ' + spotify_access_token
      }
    }
   
    // once the new access token is obtained, make new search query with the new access token
    const response = await fetch(
      "https://api.spotify.com/v1/search?" + searchQuery, searchOptionRefresh
    );
    console.log(response);
  }

  const tracks = data.tracks;
  console.log(data);
  res.status(200).json(tracks);
});

  
 
  
// const randomString = Math.random().toString(36).slice(2)
// res.cookie(stateKey, randomString)
// const scope = 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-private playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public user-read-currently-playing user-read-email';
// res.redirect(
//     "https://accounts.spotify.com/authorize?" +
//     querystring.stringify({
//         response_type: "code",
//         client_id: client_id,
//         scope: scope,
//         redirect_uri: redirect_uri,
//         state: randomString,
//     })
// );
//};
// once request is processed, user will see authorization dialog asking to authorize access within the scope that is specified
// once user accepts or denies access, user is redirected to the specified redirect_uri

// loginRouter.get('/callback', async function (req, res) {
//     console.log('hello from callback!')
//     // callback contains two query params: code = an auth code that can be exchanged for an Access Token, state = value of state param supplied in request
//     const code = req.query.code || null;
//     const state = req.query.state || null;
//     const storedState = req.cookies ? req.cookies[stateKey] : null;

//     if (state === null || state !== storedState) {
//         res.redirect('/login' +
//             querystring.stringify({
//                 error: 'state_mismatch'
//             }));
//     } else {
//         res.clearCookie(stateKey)
//         const authOptions = {
//             method: "POST",
//             body: new URLSearchParams({
//                 grant_type: "authorization_code",
//                 code: code,
//                 redirect_uri: redirect_uri,
//             }),
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 Authorization:
//                     "Basic " + btoa(client_id + ":" + process.env.CLIENT_SECRET),
//             },
//             json: true,
//         };
//         // after comparing state, now the user is ready to exchange the auth code for an Access Token by making a post request to /api/token
//         const response = await fetch(
//             "https://accounts.spotify.com/api/token",
//             authOptions
//         );

//         const data = await response.json();
//         const access_token = data.access_token;
//         const refresh_token = data.refresh_token;
//         res.cookie('spotify_access_token', access_token, { secure: true, httpOnly: true })
//         res.cookie('spotify_refresh_token', refresh_token, { secure: true, httpOnly: true })
//         res.redirect('/#' +
//             querystring.stringify({
//                 access_token: access_token,
//                 refresh_token: refresh_token
//             }));
// access tokens are deliberately set to expire after a short time, after which new tokens may be granted by supplying the refresh token obtained from the response in the auth code exchange above
// now that the user has the access token, user can make requests to Spotify API
//}
//});








module.exports = searchRouter;