import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Incorrect email/password' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Incorrect email/password' });
      }

      const { id, name, avatar } = user;

      const token = jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({
        user: {
          id,
          name,
          email,
          avatar,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default new SessionController();
