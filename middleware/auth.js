const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');


function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch(err) {
    return next();
  }
}


// function ensureSameUser(req, res, next) {
//   try {
//     const user = res.locals.user;
//     if (!(user && (user.username === req.params.username))) {
//       throw new UnauthorizedError();
//     }
//   } catch(err) {
//     return next();
//   }
// }

module.exports = { 
  authenticateJWT, 
  //ensureSameUser 
};