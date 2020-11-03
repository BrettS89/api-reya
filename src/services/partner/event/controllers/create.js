const handlers = require('@/utilities/handlers');
const redis = require('@/connections/cache');

const fn = async (req, res) => {
  try {
    const event = {
      app_id: req.body.app_id,
      audio: req.body.audio,
      _ids: req.body._ids
    };

    redis.publish('event', JSON.stringify(event));
    
    handlers.success(res, 200, { status: 'success' });
  } catch(e) {
    handlers.error(res, e, '/partner/event CREATE');
  }
};

module.exports = {
  method: 'post',
  path: '/event',
  controller: fn,
};
