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

  }

  /** Returns a given user based on the provided username.
   *  
   *  
   * 
   * @param {String} username - Username
   */
  static async get(username) {

  }

  /** Updates a user by overwriting old data with new data
   *  supplied by the UI.
   * 
   *  If update is successful, returns the user.
   * 
   *  If update fails due to not found user, throws Not Found Error.
   * 
   * @param {Object} user - Object that contains all user fields
   */
  static async update({ username, password, firstName, lastName }) {

  }

  /** Removes a user from the database.
   * 
   *  If deletion is successful, returns undefined.
   * 
   * @param {String} username - Username
   */
  static async delete(username) {

  }
}

module.exports = User;