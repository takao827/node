const Redis = require('ioredis');
const express = require('express');
const app = express();

const redis = new Redis({
  host: 'redis',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
});

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

redis.once('ready', () => {
  try {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

redis.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
