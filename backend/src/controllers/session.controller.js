const User = require('../models/User');
const { sign } = require('jsonwebtoken');

const authConfig = require('../config/auth');

module.exports = {
  async createSession(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ err: 'Email or password does not match' });
      }

      if (!(await user.comparePassword(password))) {
        return res
          .status(400)
          .json({ err: 'Email or password does not match' });
      }

      const payload = {
        userId: user.id,
      };

      const token = sign({ payload }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({
        user,
        token,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
};
