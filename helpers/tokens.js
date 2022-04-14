const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function createToken(user) {
  const payload = {
    username: user.username
  }
  
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

module.exports = createToken;