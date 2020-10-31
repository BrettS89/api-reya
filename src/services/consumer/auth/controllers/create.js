const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../user/model');
const handlers = require('../../../../utilities/handlers');
const throwError = require('../../../../utilities/throwError');

const fn = async (req, res) => {
  try {
    const { email, password } = req.body;
		const user = await User.findOne({ email }).lean();
    if (!user) throwError(404, 'No user found with this email');
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) throwError(401, 'Incorrect login credentials');
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
		delete user.password;
		handlers.success(res, 200, { user, token });
	} catch (e) {
		handlers.error(res, e, 'login');
	}
};

module.exports = {
  method: 'post',
  path: '/auth',
  controller: fn,
};
