const router = require('express').Router();
const appSub = require('./appSub');
const auth = require('./auth');
const speaker = require('./speaker');
const user = require('./user');

const controllers = [
  ...appSub,
  ...auth,
  ...speaker,
  ...user,
];

controllers.forEach(r => {
  router[r.method](r.path, r.controller);
});

module.exports = router;
