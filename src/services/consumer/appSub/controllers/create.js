const App = require('@/services/partner/app/model');
const AppSub = require('@/services/consumer/appSub/model');
const userAuth = require('@/utilities/userAuth');
const handlers = require('@/utilities/handlers');
const redis = require('@/connections/cache');
const { mp3FromString } = require('@/utilities/polly');
const { uploadTos3 } = require('@/utilities/s3');

const fn = async (req, res) => {
  try {
    const { _id } = userAuth(req.header('authorization'));

    const app = await App.findById(req.body.app_id);

    const appSub = new AppSub({
      app_id: req.body.app_id,
      user_id: _id,
    });

    const saved = await appSub.save();
    const data = await mp3FromString(`Successfully subscribed to ${app.name}.`);
    const fileUrl = await uploadTos3(data.AudioStream);

    const event = {
      app_id: req.body.app_id,
      audio: fileUrl,
      _ids: [_id],
      subscribed: true,
    };

    redis.publish('event', JSON.stringify(event));

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
