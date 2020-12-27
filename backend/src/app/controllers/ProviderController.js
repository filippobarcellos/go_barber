import User from '../models/User';

class ProviderController {
  async index(req, res) {
    try {
      const providers = await User.find({ provider: true }).select('-password');

      return res.json(providers);
    } catch (error) {
      return res.status(500).json({ error: 'Server Error' });
    }
  }
}

export default new ProviderController();
