const cookieController = {};

/**
* setCookie - set a cookie with a random number
*/

// copied from our unit
cookieController.setCookie = (req, res, next) => {
  res.cookie('dfsda', 'sdf');
  res.cookie('sdklf', 'alsdkf');
  res.cookie('secret', Math.floor(Math.random() * 100).toString());
  return next();
}

/**
* setSSIDCookie - store the user id in a cookie
*/

// also copied from our unit
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user.id, {httpOnly: true });
  return next();
}

module.exports = cookieController;
