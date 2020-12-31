import Notification from '../models/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const isProvider = await User.findOne({
      _id: req.userId,
      provider: true,
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with Providers' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      { new: true },
    );

    if (!notification) {
      return res.status(400).json({ error: 'Notification does not exist' });
    }

    return res.json(notification);
  }
}

export default new NotificationController();
