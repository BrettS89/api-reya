const App = require('@/services/partner/app/model');
const AppSub = require('@/services/consumer/appSub/model');
const handlers = require('@/utilities/handlers');
const userAuth = require('@/utilities/userAuth');
const throwError = require('@/utilities/throwError');

const controller = async (req, res) => {
  try {
    let user = null;
    try {
      user = userAuth(req.header('authorization'));
    } catch(e) {

    }

    const _id = req.params.id;
    const app = (await App.findById(_id)).toObject();

    if (user) {
      const sub = await AppSub.findOne({ app_id: app._id, user_id: user._id });
      if (sub) app.subscribed = true;
      console.log(sub, app);
    }
    
    handlers.success(res, 200, app);
  } catch(e) {
    handlers.error(res, e, '/partner/app GET');
  }
};

module.exports = {
  controller,
  method: 'get',
  path: '/app/:id',
};
