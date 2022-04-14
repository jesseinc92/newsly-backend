const express = require('express');
const { ensureSameUser } = require('../middleware/auth');
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
    const user = await User.get(username);
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
router.put('/:username', async (req, res, next) => {
  const { username, firstName, lastName } = req.body;
  try {
    console.log(req.body)
    const user = await User.update({ username, firstName, lastName });
    return res.json({ user });
  } catch(err) {
    next(err)
  }
});

/** DELETE /user/{ username }
 * 
 *  Accepts a username as a parameter and deletes the
 *    selected user profile from the database. Also
 *    removes all linked bookmarked articles and metrics.
 *  
 *  Returns { deleted: username }
 * 
 *  Authorization: same user
 */
router.delete('/:username', async (req, res, next) => {
  const username = req.params.username;
  try {
    await User.delete(username);
    return res.json({ deleted: username });
  } catch(err) {
    next(err);
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

/** POST /user/{ username }/bookmark/{ articleId }
 * 
 *  Returns { article: { }}
 * 
 *  Authorization: same user
 */
 router.post('/:username/bookmark', async (req, res, next) => {
  const username = req.params.username;
  const article = req.body;
  try {
    const bookmark = await User.addBookmark(username, article);
    return res.status(201).json({ article: bookmark });
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
router.get('/:username/bookmark/:articleId', async (req, res, next) => {
  const { username, articleId } = req.params;
  try {
    const bookmark = await User.getBookmark(username, articleId);
    return res.json({ article: bookmark });
  } catch(err) {
    next(err)
  }
});

/** DELETE /user/{ username }/bookmark/{ articleId }
 * 
 *  Returns { bookmark: deleted }
 * 
 *  Authorization: same user
 */
router.delete('/:username/bookmark/:articleId', async (req, res, next) => {
  const { username, articleId } = req.params;
  try {
    await User.removeBookmark(username, articleId);
    return res.json({ bookmark: deleted });
  } catch(err) {
    next(err);
  }
});

module.exports = router;