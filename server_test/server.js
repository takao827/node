const Redis = require('ioredis');
const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const redis = new Redis({
  host: 'redis',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
});

const init = async () => {
  await Promise.all([
    redis.set('users:1', JSON.stringify({ id: 1, name: 'John Doe' })),
    redis.set('users:2', JSON.stringify({ id: 2, name: 'Jane Doe' })),
    redis.set('users:3', JSON.stringify({ id: 3, name: 'John Smith' })),
    redis.set('users:4', JSON.stringify({ id: 4, name: 'Jane Smith' })),
  ]);
};

const { logMiddleware } = require('./middleware/logMiddleware');

app.use(logMiddleware);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'index.ejs'));
});

app.get('/user/:id', async (req, res) => {
  try {
    const key = `users:${req.params.id}`;
    const val = await redis.get(key);
    const user = JSON.parse(val);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/users', async (req, res) => {
  try {
    const stream = redis.scanStream({
      match: 'users:*',
      count: 2,
    });

    const users = [];
    for await (const keys of stream) {
      for (const key of keys) {
        const val = await redis.get(key);
        const user = JSON.parse(val);
        users.push(user);
      }
    }

    res.render(path.join(__dirname, 'views', 'users.ejs'), { users: users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

redis.once('ready', async () => {
  try {
    await init();

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
