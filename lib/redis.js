const { redisConfig } = require('../config');
const Redis = require('ioredis');

let redis = null;

const getClient = () => {
  return redis;
};

exports.getClient = getClient;

const connect = () => {
  if (!redis) {
    redis = new Redis(redisConfig);
  }
  return redis;
};

exports.connect = connect;

const init = async () => {
  await Promise.all([
    redis.set('users:1', JSON.stringify({ id: 1, name: 'John Doe' })),
    redis.set('users:2', JSON.stringify({ id: 2, name: 'Jane Doe' })),
    redis.set('users:3', JSON.stringify({ id: 3, name: 'John Smith' })),
    redis.set('users:4', JSON.stringify({ id: 4, name: 'Jane Smith' })),
  ]);
};

exports.init = init;
