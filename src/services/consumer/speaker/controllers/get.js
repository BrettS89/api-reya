const handlers = require('@/utilities/handlers');
const userAuth = require('@/utilities/userAuth');
const Speaker = require('@/services/consumer/speaker/model');

const controller = async (req, res) => {
  try {
    const { _id } = userAuth(req.header('authorization'));
    let speaker = await Speaker.findOne({ user_id: _id });

    if (!speaker) {
      speaker = null;
    }

    handlers.success(res, 200, speaker);
  } catch(e) {
    handlers.error(res, e, '/consumer/speaker GET');
  }
};

module.exports = {
  controller,
  method: 'get',
  path: '/speaker',
};
