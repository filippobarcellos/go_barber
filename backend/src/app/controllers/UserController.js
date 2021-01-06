import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const { email } = req.body;

      const userExist = await User.findOne({ email });

      if (userExist) {
        throw new Error('User already exist');
      }

      const user = await User.create(req.body);

      const { _id, name, avatar } = user;

      return res.json({
        _id,
        name,
        email,
        avatar,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  async update(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ error: 'User was not found.' });
      }

      if (user !== email) {
        const userExists = await User.findOne({ email });

        if (!userExists) {
          return res.status(400).json({ error: 'User already exists.' });
        }
      }

      const userUpdated = await User.findOneAndUpdate(req.userId, req.body, {
        new: true,
      });

      return res.json(userUpdated);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new UserController();
