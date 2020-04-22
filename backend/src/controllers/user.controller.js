const User = require('../models/User');

module.exports = {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ err: 'User already exist' });
      }

      const user = await User.create(req.body);

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ err: 'Server error' });
    }
  },
};
