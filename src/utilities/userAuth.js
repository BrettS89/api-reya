const jwt = require('jsonwebtoken');
const throwError = require('./throwError');

module.exports = token => {
	if (!token) throwError(401, 'no auth token');

	try {
		jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {

    const error = e.toString().split(' ')[2];
    
    if (error === 'signature')
      throwError(401, 'bad token signature');
	}

	const decodedUser = jwt.decode(token);

  if (!decodedUser) throwError(401, 'Unauthorized');
  
	return decodedUser;
};
