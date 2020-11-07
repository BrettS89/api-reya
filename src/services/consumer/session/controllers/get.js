const handlers = require('@/utilities/handlers');
const userAuth = require('@/utilities/userAuth');
const Session = require('@/services/consumer/session/model');

const controller = async (req, res) => {
  try {
    const { _id } = userAuth(req.header('authorization'));
    let session = await Session.findOne({ user_id: _id });

    if (!session) {
      session = null;
    }

    handlers.success(res, 200, session);
  } catch(e) {
    handlers.success(res, 200, { session: null });
  }
};

module.exports = {
  controller,
  method: 'get',
  path: '/session',
};
