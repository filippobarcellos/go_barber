import jwt from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../../config/auth';

exports.createSession = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email/password');
  }

  if (!(await user.checkPassword(password))) {
    throw new Error('Incorrect email/password');
  }

  const { id, name } = user;

  const token = jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });

  return res.json({
    user: {
      id,
      name,
      email,
    },
    token,
  });
};
