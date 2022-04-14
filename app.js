const express = require('express');
const cors = require('cors');
const { authenticateJWT } = require('./middleware/auth');

const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = new express();

// middleware config
app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

// Routes imported from their respective routers
app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Error handler if there are no endpoint matches
// or if any previous route/middleware throws an error
app.use((err, req, res, next) => {
  const status = err.status ?? 500;
  const message = err.message

  return res.status(status).json({
    error: { message, status }
  });
});

module.exports = app;