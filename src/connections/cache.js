const redis = require('redis');

const publisher = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,   
  password: process.env.REDIS_PASSWORD,           
});

module.exports = publisher;
