const handlers = require('@/utilities/handlers');
const throwError = require('@/utilities/throwError');
const userAuth = require('@/utilities/userAuth');
const Speaker = require('@/services/consumer/speaker/model');
const redis = require('@/connections/cache');

const controller = async (req, res) => {
  try {
    const { _id } = userAuth(req.header('authorization'));
    const speaker = await Speaker.findOne({ user_id: _id })
    if (!speaker) throwError(404, 'no speaker found');

    Object.keys(req.body).forEach(k => {
      speaker[k] = req.body[k]
    });

    const updatedSpeaker = await speaker.save();

    redis.publish('mute', _id.toString());

    handlers.success(res, 200, updatedSpeaker);
  } catch(e) {
    handlers.error(res, e, '/consumer/speaker PATCH');
  }
};

module.exports = {
  controller,
  method: 'patch',
  path: '/speaker',
};
