const cookieController = {};

// /**
// * setCookie - set a cookie with a random number
// */

// // copied from our unit
// cookieController.setCookie = (req, res, next) => {
//   res.cookie('asd', 'adf');
//   res.cookie('sdklf', 'alsdkf');
//   res.cookie('secret', Math.floor(Math.random() * 100).toString());
//   return next();
// }

/**
* setSSIDCookie - store the user id in a cookie
*/

// res.cookie() function is used to set the cookie name to value
// sets a cookie with name ( name ) and value ( value ) to be sent along with the response.
// ssid = user's id
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user._id, {httpOnly: true });
  return next();
}

// cookieController.setOauthCookie = (req, res, next) => {
//   //res.cookie('ssid', , {httpOnly: true }); //store the token
//   return next();
// }

module.exports = cookieController;
