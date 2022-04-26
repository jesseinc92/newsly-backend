const bcrypt = require('bcrypt');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../expressError');
const { BCRYPT_WORK_FACTOR } = require('../config');
const Metric = require('./metric');
const db = require('../db');

class User {

  /** Authenticates a user by validating username/password pairs.
   * 
   *  If authentication is successful, returns the user.
   * 
   *  If authentication fails, throws an Unauthorized Error.
   * 
   * @param {String} username - Username
   * @param {String} password - Password
   */
  static async authenticate(username, password) {
    const result = await db.query(
          `SELECT 
            username,
            hashed_pass AS "password",
            first_name AS "firstName",
            last_name AS "lastName"
           FROM users
           WHERE username = $1`,
          [username]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError('Invalid username or password!');
  }

  /** Creates a new user by storing new user details into the database.
   *  
   * If registration is successful, returns the user.
   * 
   * If authentication fails due to duplication, throws a Bad Request Error.
   * 
   * @param {Object} user - Object that contains all user fields
   */
  static async register({ username, password, firstName, lastName }) {
    const duplicateCheck = await db.query(
        `SELECT username
         FROM users
         WHERE username = $1`,
        [username]
    );

    if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate username: ${username}`);

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
        `INSERT INTO users (
          username,
          hashed_pass,
          first_name,
          last_name
        )
        VALUES ($1, $2, $3, $4)
        RETURNING username, first_name AS "firstName", last_name AS "lastName"`,
        [username, hashedPassword, firstName, lastName]
    );
    
    const user = result.rows[0];

    return user;
  }

  /** Returns a given user based on the provided username.
   *  
   *  If authenticated, returns the user.
   * 
   * @param {String} username - Username
   */
  static async get(username) {
    const result = await db.query(
        `SELECT 
          username,
          first_name AS "firstName",
          last_name AS "lastName"
         FROM users
         WHERE username = $1`,
        [username]
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`User ${username} does not exist.`);

    // Search and return bookmarks from db
    const savedResults = await db.query(
        `SELECT
          id,
          user_id AS "userId",
          title AS "webTitle",
          section_id AS "sectionId",
          section_name AS "sectionName"
         FROM bookmarks
         WHERE user_id = $1`,
        [username]
    );

    user.bookmarks = savedResults.rows;

    const metrics = await Metric.get(username);
    user.metrics = metrics;

    return user;
  }

  /** Updates a user by overwriting old data with new data
   *  supplied by the UI.
   * 
   *  If update is successful, returns the user.
   * 
   *  If update fails due to not found user, throws Not Found Error.
   * 
   * @param {Object} user - Object that contains all updateable user fields
   */
  static async update({ username, firstName, lastName }) {
    const result = await db.query(
        `UPDATE users
         SET
          first_name = $1,
          last_name = $2
         WHERE username = $3
         RETURNING
          username,
          first_name AS "firstName",
          last_name AS "lastName"`,
        [firstName, lastName, username]
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`User ${username} does not exist`);

    // Search and return bookmarks from db
    const savedResults = await db.query(
      `SELECT
        id,
        user_id AS "userId",
        title AS "webTitle",
        section_id AS "sectionId",
        section_name AS "sectionName"
       FROM bookmarks
       WHERE user_id = $1`,
      [username]
    );

    user.bookmarks = savedResults.rows;

    const metrics = await Metric.get(username);
    user.metrics = metrics;

    return user;
  }

  /** Removes a user from the database.
   * 
   *  If deletion is successful, returns undefined.
   * 
   * @param {String} username - Username
   */
  static async delete(username) {
    const result = await db.query(
        `DELETE
         FROM users
         WHERE username = $1
         RETURNING username`,
        [username]
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`User ${username} not found.`);
  }

  /** Adds an article to the bookmarks database for future retrieval.
   * 
   * @param {String} username - Associated username
   * @param {Object} article - All article fields to save
   */
  static async addBookmark(username, { articleId, title, sectionId, sectionName }) {
    const duplicateCheck = await db.query(
        `SELECT id AS "articleId"
         FROM bookmarks
         WHERE id = $1 AND user_id = $2`,
        [articleId ,username]
    );

    if (duplicateCheck.rows[0]) throw new BadRequestError(`Bookmark already exists!`);

    const result = await db.query(
        `INSERT INTO bookmarks (
          id,
          user_id,
          title,
          section_id,
          section_name 
        )
         VALUES ($1, $2, $3, $4, $5)
         RETURNING 
          id,
          user_id AS "userId",
          title AS "webTitle",
          section_id AS "sectionId",
          section_name AS "sectionName"`,
        [articleId, username, title, sectionId, sectionName]
    );

    const newArticle = result.rows[0];

    return newArticle;
  }

  /** Retrieves an article from the bookmarks database for
   *  a specified user.
   * 
   * @param {String} username - Associated username
   * @param {String} articleId - Article ID to lookup article
   */
  static async getBookmark(username, articleId) {
    const result = await db.query(
        `SELECT 
          id AS "articleId",
          user_id AS "userId"
         FROM bookmarks
         WHERE id = $1 AND user_id = $2`,
        [articleId, username]
    );

    const article = result.rows[0];

    if (!article) throw new NotFoundError(`Bookmark wasn't found!`);

    return article;
  }

  /** Removes an article from the bookmarks database.
   * 
   * @param {String} username - Associated username
   * @param {String} articleId - Article ID to lookup article 
   */
  static async removeBookmark(username, articleId) {
    const result = await db.query(
        `DELETE FROM bookmarks
         WHERE id = $1 AND user_id = $2
         RETURNING id, user_id`,
        [articleId, username]
    );

    if (!result.rows[0]) throw new NotFoundError(`Bookmark not found!`);
  }
}

module.exports = User;