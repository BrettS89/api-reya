const consumer = require('./consumer');
const partner = require('./partner');

module.exports = app => {
  app.use('/consumer', consumer);
  app.use('/partner', partner);
};
