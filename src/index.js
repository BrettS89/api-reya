const express = require('express');
const middleware = require('./middleware');
const connections = require('./connections');
// require('./connections/cache');
require('dotenv').config();

const app = express();

connections.forEach(fn => fn(app));
middleware.forEach(fn => fn(app));

module.exports = app;
