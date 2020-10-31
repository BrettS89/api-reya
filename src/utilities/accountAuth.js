const throwError = require('./throwError');

module.exports = (authString) => {
  if (authString !== process.env.AUTH_STRING) {
    throwError(401, 'unauthorized');
  }

  return { _id: process.env.REYA_ID };
};
