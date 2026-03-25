const express = require('express');
const app = express();

const { logMiddleware } = require('./middleware/logMiddleware');

app.use(logMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
