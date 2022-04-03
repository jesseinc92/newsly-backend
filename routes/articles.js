const express = require('express');
const router = new express.Router();

/** GET /articles => { articles }
 * 
 *  Returns { article: { }}
 *  
 *  No Authorization Required
 */
router.get('/', (req, res, next) => {
  try {

  } catch(err) {
    next(err);
  }
});

/** GET /articles/search =>
 * 
 *  Accepts a query string wtih either 'keyword' or 'section'.
 * 
 *  Returns a list of articles by matching keyword, or a list
 *    of articles by news section.
 * 
 *  { articles: [] }
 * 
 *  No Authorization Required
 */
router.get('/search', (req, res, next) => {
  try{

  } catch(err) {
    next(err);
  }
});

module.exports = router;