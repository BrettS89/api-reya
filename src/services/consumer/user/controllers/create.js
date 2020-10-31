const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model');
const handlers = require('../../../../utilities/handlers');
const throwError = require('../../../../utilities/throwError');

const fn = async (req, res) => {
  try {
    const { email, password } = req.body;
		const foundUser = await User.findOne({ email });
		if (foundUser) throwError(400, 'This email already exists');
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
		const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
		handlers.success(res, 201, { token, user: savedUser });
	} catch (e) {
		handlers.error(res, e, 'register');
	}
};

module.exports = {
  method: 'post',
  path: '/user',
  controller: fn,
};
