const http = require('./http');
const router = require('./router');
const security = require('./security');

module.exports = [
  http,
  router,
  security,
];
