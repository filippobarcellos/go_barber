import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointment';
import Notification from '../models/Notification';

class AppointmentController {
  async store(req, res) {
    try {
      const { provider, date } = req.body;

      const parsedDate = parseISO(date);
      const hourStart = startOfHour(parsedDate);

      // Check if the provider passed is a provider in DB
      const isProvider = await User.findOne({
        _id: provider,
        provider: true,
      });

      if (!isProvider) {
        return res
          .status(401)
          .json({ error: 'You can only create appointments with Providers' });
      }

      // Check for past dates
      if (isBefore(hourStart, new Date())) {
        return res.status(400).json({ error: 'Past dates are not permitted' });
      }

      // check availability
      const appointmentSameHour = await Appointment.findOne({
        provider,
        date: hourStart,
      });

      if (appointmentSameHour) {
        return res
          .status(400)
          .json({ error: 'This hour is not available for appointment' });
      }

      const appointment = await Appointment.create({
        user: req.userId,
        provider,
        date: hourStart,
      });

      const user = await User.findById(req.userId);
      const formattedDate = format(hourStart, "do MMMM 'at' h'h'");

      // Notify provider
      await Notification.create({
        content: `New appointment on ${formattedDate} by ${user.name} `,
        user: provider,
      });

      return res.json(appointment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const appointments = await Appointment.find({
        user: req.userId,
      }).populate('provider', ['name', 'avatar_url', 'email']);

      return res.json(appointments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new AppointmentController();
