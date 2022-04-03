const express = require('express');
const router = new express.Router();

/** POST /auth/token => { token }
 * 
 *  Accepts username/password pair in the request body
 *    and returns a token for future requests that require
 *    user authorization.
 */
router.post('/token', (req, res, next) => {

});

/** POST /auth/register => { token }
 * 
 *  Request body must include username, password, first name, and last name.
 *    A user is then created and an auth token is returned.
 */
router.post('/register', (req, res, next) => {

});

module.exports = router;