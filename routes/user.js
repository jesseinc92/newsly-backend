const express = require('express');
const router = new express.Router();

const User = require('../models/user');

/** GET /user/{ username } => { user }
 * 
 *  Returns { user: { }}
 * 
 *  Authorization: same user
 */
router.get('/:username', async (req, res, next) => {
  const username = req.params.username;
  try {
    let response = User.get(username);
    let user = response.data;
    return res.json({ user });
  } catch(err) {
    next(err)
  }
});

/** PUT /user/{ username } => { user }
 * 
 *  Accepts the request body and updates the database
 *    with any edits.
 * 
 *  Returns { user: { }}
 * 
 *  Authorization: same user
 */
router.put('/:username', (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
});

/** POST /user/{ username }/goals
 * 
 *  Accepts a request body that holds an updated user
 *    consumption goal. Returns all current metrics information.
 * 
 *  Returns { metrics: { }}
 * 
 *  Authorization: same user
 */
router.post('/:username/goals', (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
});

/** POST /user/{ username }/metrics => { metrics }
 * 
 *  Called whenever an authed user views a new article.
 *    Endopint adds current article to calculation pool,
 *    adds up category views, and notifies user if they are
 *    meeting or not meeting goals.
 * 
 *  Accepts article data from request body and returns the
 *    full metrics data for the authed user.
 * 
 *  Authorization: same user
 */
router.post('/:username/metrics', (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
});

/** GET /user/{ username }/bookmark/{ articleId }
 * 
 *  Returns { article: { }}
 * 
 *  Authorization: same user
 */
router.get('/:username/bookmark/:articleId', (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
});

/** POST /user/{ username }/bookmark/{ articleId }
 * 
 *  Returns { article: { }}
 * 
 *  Authorization: same user
 */
router.post('/:username/bookmark/:articleId', (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
});

module.exports = router;