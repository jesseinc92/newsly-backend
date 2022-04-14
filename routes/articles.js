const express = require('express');
const { BadRequestError } = require('../expressError');
const router = new express.Router();

const Article = require('../models/article');

/** GET /articles => { articles }
 * 
 *  Accepts an optional query parameter for results pagination
 * 
 *  Returns { articles: [ ]}
 *  
 *  No Authorization Required
 */
router.get('/', async (req, res, next) => {
  const pageNum = req.query.page;
  try {
    let response = await Article.getNewestArticles(pageNum);
    return res.json({ articles: response })
  } catch(err) {
    next(err);
  }
});

/** GET /articles/search =>
 * 
 *  Accepts a mandatory query string wtih either 'keyword' or 'section'.
 * 
 *  Returns a list of articles by matching keyword, or a list
 *    of articles by news section.
 * 
 *  { articles: [] }
 * 
 *  No Authorization Required
 */
router.get('/search', async (req, res, next) => {
  const queryFilter = req.query;
  const filterItem = Object.values(queryFilter)[0];
  let queryParam;
  try{
    // Construct filter query from request
    if (Object.keys(queryFilter)[0] === 'keyword') {
      queryParam = `/search?q=${filterItem}&`
    } else if (Object.keys(queryFilter)[0] === 'section') {
      queryParam = `/${filterItem}?`;
    } else {
      throw new BadRequestError();
    }

    let response = await Article.getArticlesByFilter(queryParam);
    return res.json({ articles: response });
  } catch(err) {
    next(err);
  }
});

/** GET /articles/{ articleId } => { article }
 * 
 *  Accepts an article ID for a single article and returns
 *    all relevant fields for consumption. ArticleId MUST
 *    be encoded before passing.
 * 
 *  Returns { article: [ ]}
 * 
 *  No Authorization Required
 */
router.get('/:articleId', async (req, res, next) => {
  const articleId = req.params.articleId;
  try {
    let response = await Article.getSingleArticle(articleId);
    return res.json({ article: response });
  } catch(err) {
    next(err);
  }
});

module.exports = router;