const express = require('express');
const createToken = require('../helpers/tokens');
const Metric = require('../models/metric');
const router = new express.Router();

const User = require('../models/user');

/** POST /auth/token => { token }
 * 
 *  Accepts username/password pair in the request body
 *    and returns a token for future requests that require
 *    user authorization.
 */
router.post('/token', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch(err) {
    next(err);
  }
});

/** POST /auth/register => { token }
 * 
 *  Request body must include username, password, first name, and last name.
 *    A user is then created and an auth token is returned.
 */
router.post('/register', async (req, res, next) => {
  const user = req.body;
  try {
    const newUser = await User.register(user);
    const newMetrics = await Metric.create(user);
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch(err) {
    next(err);
  }
});

module.exports = router;