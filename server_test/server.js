const path = require('path');
const express = require('express');
const app = express();
const redis = require('./lib/redis');

app.set('view engine', 'ejs');

const { logMiddleware } = require('./middleware/logMiddleware');

app.use(logMiddleware);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'index.ejs'));
});

const getUser = async (id) => {
  const key = `users:${id}`;
  const val = await redis.getClient().get(key);
  return JSON.parse(val);
};

app.get('/user/:id', async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

const getUsers = async () => {
  const stream = redis.getClient().scanStream({
    match: 'users:*',
    count: 2,
  });
  const users = [];
  for await (const keys of stream) {
    for (const key of keys) {
      const val = await redis.getClient().get(key);
      const user = JSON.parse(val);
      users.push(user);
    }
  }
  return { users: users };
};

app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.render(path.join(__dirname, 'views', 'users.ejs'), users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

redis.connect().once('ready', async () => {
  try {
    await redis.init();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

redis.getClient().on('error', (err) => {
  console.error(err);
  process.exit(1);
});
