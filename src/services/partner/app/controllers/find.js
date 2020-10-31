const App = require('../model');
const handlers = require('../../../../utilities/handlers');

const controller = (req, res) => {
  try {
    const skip = Number(req.query.skip) ?? 0;
    const query = App
      .find({ active: true })
      .sort({ subscribers: -1 })
      .skip(skip);
      
    query
      .then(apps => {
        handlers.success(res, 200, apps);
      })
      .catch(e => {
        handlers.error(res, e, '/partner/app FIND');
      })

  } catch(e) {
    handlers.error(res, e, '/partner/app FIND');
  }
};

module.exports = {
  controller,
  method: 'get',
  path: '/app',
};
