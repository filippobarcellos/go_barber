import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointment';

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
      const hasAppointmentSameHour = await Appointment.findOne({
        provider,
        date: hourStart,
      });

      if (hasAppointmentSameHour) {
        return res
          .status(400)
          .json({ error: 'This hour is not available for appointment' });
      }

      const appointment = await Appointment.create({
        user: req.userId,
        provider,
        date: hourStart,
      });

      return res.json(appointment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async list(req, res) {
    const appointments = await Appointment.find();

    return res.json(appointments);
  }
}

export default new AppointmentController();
