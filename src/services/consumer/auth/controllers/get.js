const handlers = require('../../../../utilities/handlers');
const userAuth = require('../../../../utilities/userAuth');
const throwError = require('../../../../utilities/throwError');
const User = require('../../user/model');

const fn = async (req, res) => {
  try {
    console.log('inn');
    const { _id } = await userAuth(req.header('authorization'));
    const user = await User.findById(_id);
		if (!user) throwError(404, 'Could not find user');
		handlers.success(res, 200, user);
  } catch(e) {
    handlers.error(res, e, 'GET consumer/session');
  }
};

module.exports = {
  method: 'get',
  path: '/auth',
  controller: fn,
};
