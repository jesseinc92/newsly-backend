const axios = require('axios');
const { API_KEY, BASE_URL } = require('../config');
const { ExpressError, BadRequestError } = require('../expressError');

class Article {

  /** Retrieves all-content articles from the Guardian, regardless
   *  of section or keyword. Orders them by newest.
   * 
   *  Error thrown if pagination is not a positive integer.
   * 
   * @param {Integer} page - Optional parameter for results pagination.
   */
  static async getNewestArticles(page = 1) {
    try {
      if (page < 1) throw new BadRequestError();
      let response = await axios.get(`${BASE_URL}/search?api-key=${API_KEY}&page-size=20&page=${page}`);
      let newestArticles = response.data.response.results;
      return newestArticles;
    } catch(err) {
      throw new ExpressError(err.message, err.status);
    }
  }

  /** Accepts a single query string that filters the list of
   *  articles called by the API. These can be filtered by
   *  keyword or section.
   * 
   * @param {String} queryFilter - Query string to add to API Url
   */
  static async getArticlesByFilter(queryFilter) {
    try {
      if (!queryFilter) throw new BadRequestError();
      let response = await axios.get(`${BASE_URL}${queryFilter}api-key=${API_KEY}`);
      let filteredArticles = response.data.response.results;
      return filteredArticles;
    } catch(err) {
      throw new ExpressError(err.message, err.status);
    }
  }

  /** Accepts a single-article api ID and calls the required resource.
   *  Returns a full article entity with all required fields.
   * 
   * @param {String} articleId - Article ID to call individual details from API.
   */
  static async getSingleArticle(articleId) {
    try {
      let response = await axios.get(`${BASE_URL}/${articleId}?api-key=${API_KEY}&show-fields=all`);
      let singleArticle = response.data.response.content;
      return singleArticle;
    } catch(err) {
      throw new ExpressError(err.message, err.status);
    }
  }
 }

module.exports = Article;