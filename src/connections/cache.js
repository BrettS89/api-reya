const redis = require('redis');

const publisher = redis.createClient({
  port: 6379,              
});

module.exports = publisher;
