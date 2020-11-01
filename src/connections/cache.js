const redis = require('redis');

// if (process.env.LOCAL === 'true') {
//   console.log('inn')
  // var publisher = redis.createClient({
  //   host: process.env.REDIS_HOST,
  //   port: process.env.REDIS_PORT,   
  //   password: process.env.REDIS_PASSWORD,           
  // });
// } else {
//   console.log('ayo')
  const publisher = redis.createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,    
  });
// }

// publisher.on("subscribe", function(channel, count) {
//   console.log(`subscribed to`, channel);
// });

// publisher.on('message', (channel, message) => {
//   console.log('inn');
//   eventHandler(message);
// });

// publisher.subscribe('event')

module.exports = publisher;
