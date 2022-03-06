const Session = require('../models/sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
// write code here

};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
    const cookieId = res.locals.user._id;
    const createdAt = Date.now(); // not sure if correct
    if (!cookieId) return next({ 'Missing cookieId in sessionController.startSession'});

    Session.create({ cookieId: cookieId, createdAt: createdAt }, (err, session) => {
        if (err) {
            return next({
                log: 'Error in sessionController.startSession',
                status: 400,
                message: { err: 'An error occurred' },
            })
        }
        else {
            res.locals.session = session;
            return next();
        }
    })

};

module.exports = sessionController;
