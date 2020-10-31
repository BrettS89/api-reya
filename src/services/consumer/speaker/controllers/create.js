const handlers = require('../../../../utilities/handlers');
const throwError = require('../../../../utilities/throwError');
const userAuth = require('../../../../utilities/userAuth');
const Speaker = require('../model');

const fn = async (req, res) => {
  try {
    const { _id } = userAuth(req.header('authorization'));
    const speaker = new Speaker({
      user_id: _id,
      processed: true,
    });

    const saved = await speaker.save();
    handlers.success(res, 201, saved);
  } catch(e) {
    handlers.error(res, e, '/consumer/speaker CREATE');
  }
};

module.exports = {
  method: 'post',
  path: '/speaker',
  controller: fn,
};
