const router = require('express').Router();
const account = require('./account');
const app = require('./app');
const event = require('./event');

const controllers = [
  ...account,
  ...app,
  ...event,
];

controllers.forEach(r => {
  router[r.method](r.path, r.controller);
});

module.exports = router;
