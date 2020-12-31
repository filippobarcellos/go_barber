import { parseISO, startOfDay, endOfDay } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    try {
      const isProvider = await User.findOne({
        _id: req.userId,
        provider: true,
      });

      if (!isProvider) {
        return res.status(401).json({
          error: 'You are not a provider. Please check your credentials',
        });
      }

      const { date } = req.query;
      const parsedDate = parseISO(date);

      const appointments = await Appointment.find({
        provider: req.userId,
        date: { $gte: startOfDay(parsedDate), $lt: endOfDay(parsedDate) },
      });

      return res.json(appointments);
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default new ScheduleController();
