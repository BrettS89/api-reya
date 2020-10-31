const App = require('../model');
const accountAuth = require('../../../../utilities/accountAuth');
const handlers = require('../../../../utilities/handlers');

const fn = async (req, res) => {
  try {
    const { _id } = accountAuth(req.header('authorization'));
    const data = { ...req.body, account_id: _id };
    const app = new App(data);
    app.save().then(saved => {
      handlers.success(res, 201, saved);
    });
  } catch(e) {
    handlers.error(res, e, 'partner/app CREATE');
  }
};

module.exports = {
  controller: fn,
  method: 'post',
  path: '/app',
};
