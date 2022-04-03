const app = require('./app');

// Configures server port that listens for requests
app.listen(3001, () => {
  console.log(`Server started on http://localhost:3001`)
});