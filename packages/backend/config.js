const redisConfig = {
  port: 6379,
  host: 'redis',
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
};

exports.redisConfig = redisConfig;
