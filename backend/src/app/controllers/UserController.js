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

  const { _id, name } = await User.create(req.body);

  return res.json({
    _id,
    name,
    email,
  });
};

exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

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
