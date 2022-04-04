const app = require('./app');
const { PORT } = require('./config')

// Configures server port that listens for requests
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
});