import User from '../models/User';

exports.getProviders = async (req, res) => {
  const providers = await User.find({ provider: true }).select('-password');

  return res.json(providers);
};
