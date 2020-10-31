const AppSub = require('@/services/consumer/appSub/model');
const userAuth = require('@/utilities/userAuth');
const handlers = require('@/utilities/handlers');

const controller = async (req, res) => {
  try {
    const { _id } = userAuth(req.header('authorization'));
    const appsubId = req.params.id;
    const sub = await AppSub.findById(appsubId);
    await sub.remove();
    handlers.success(res, 200, { removed_id: sub._id });
  } catch(e) {
    handlers.error(res, e, '/consumer/appsub DELETE');
  }
};

module.exports = {
  controller,
  method: 'delete',
  path: '/appsub/:id'
};
