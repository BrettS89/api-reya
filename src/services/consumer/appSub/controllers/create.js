const AppSub = require('@/services/consumer/appSub/model');
const userAuth = require('@/utilities/userAuth');
const handlers = require('@/utilities/handlers');

const fn = async (req, res) => {
  try {
    const { _id } = userAuth(req.header('authorization'));

    const appSub = new AppSub({
      app_id: req.body.app_id,
      user_id: _id,
    });

    const saved = await appSub.save();

    handlers.success(res, 201, saved);
  } catch(e) {
    handlers.error(res, e, '/consumer/appsub CREATE');
  }
};

module.exports = {
  controller: fn,
  method: 'post',
  path: '/appsub',
};
