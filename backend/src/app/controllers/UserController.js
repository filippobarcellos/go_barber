import path from 'path';
import fs from 'fs';
import User from '../models/User';

import uploadConfig from '../../config/upload';

exports.createUser = async (req, res) => {
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
};

exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      // remove previous avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = req.file.filename;

    await user.save();

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(400).json({ error: 'User was not found' });
  }

  if (email !== user.email) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
  }

  const { id, name, avatar } = await user.updateOne(req.body);

  return res.json({
    id,
    name,
    email,
    avatar,
  });
};
