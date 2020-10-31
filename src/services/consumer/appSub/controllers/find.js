const mongoose = require('mongoose');
const AppSub = require('@/services/consumer/appSub/model');
const handlers = require('@/utilities/handlers');
const userAuth = require('@/utilities/userAuth');

const controller = async (req, res) => {
  try {
    let user;

    try {
      user = userAuth(req.header('authorization'));
    } catch(e) {
      handlers.success(res, 200, []);
    }

    let userId = mongoose.Types.ObjectId(user._id);

    const appSubs = await AppSub.aggregate([
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: 'apps',
          localField: 'app_id',
          foreignField: '_id',
          as: 'app',
        },
      },
    ]);

    const subs = appSubs.map(s => {
      if (s.app.length) {
        return {
          ...s,
          app: s.app[0],
        };
      }
    }).filter(s => !!s);

    handlers.success(res, 200, subs);
  } catch(e) {
    console.log('error', e);
    handlers.success(res, 200, []);
  }
};

module.exports = {
  controller,
  method: 'get',
  path: '/appsub',
};
