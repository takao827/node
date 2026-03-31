const path = require('path');
const express = require('express');
const redis = require('./lib/redis');
const userHandler = require('./handlers/userHandler');

const app = express();

app.set('view engine', 'ejs');

const { logMiddleware } = require('./middleware/logMiddleware');

app.use(logMiddleware);

app.use('/static', express.static(path.join(__dirname, 'public')));

// TODO: Decoratorパターンでハンドラーからエラーハンドリング、ロギングを切り出す

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await userHandler.getUser(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await userHandler.getUsers(req);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

redis
  .connect()
  .once('ready', async () => {
    try {
      await redis.init();

      app.listen(8000, () => {
        console.log('Server is running on port 8000');
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
