const redis = require('../lib/redis');

const getUser = async (id) => {
  const key = `users:${id}`;
  const val = await redis.getClient().get(key);
  return JSON.parse(val);
};

exports.getUser = getUser;

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

exports.getUsers = getUsers;
