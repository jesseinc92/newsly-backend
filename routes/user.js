const express = require('express');
const router = new express.Router();

/** GET /user/{ username } => { user }
 * 
 *  Returns { user: { }}
 * 
 *  Authorization: same user
 */
router.get('/:username', (req, res, next) => {

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

});

/** GET /user/{ username }/bookmark/{ articleId }
 * 
 *  Returns { article: { }}
 * 
 *  Authorization: same user
 */
router.get('/:username/bookmark/:articleId', (req, res, next) => {

});

/** POST /user/{ username }/bookmark/{ articleId }
 * 
 *  Returns { article: { }}
 * 
 *  Authorization: same user
 */
router.post('/:username/bookmark/:articleId', (req, res, next) => {

});

module.exports = router;