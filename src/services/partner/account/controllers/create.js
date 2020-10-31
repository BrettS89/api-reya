const Account = require('../model');
const handlers = require('../../../../utilities/handlers');

const fn = async (req, res) => {
  try {
    const account = new Account({
      company_name: req.body.company_name
    });

    account.save().then(saved => {
      handlers.success(res, 201, saved);
    });
  } catch(e) {
    handlers.error(res, e, 'partner/account CREATE');
  }
};

module.exports = {
  controller: fn,
  method: 'post',
  path: '/account',
};
