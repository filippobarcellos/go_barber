import { startOfMonth, endOfMonth, getHours } from 'date-fns';
import Appointment from '../models/Appointment';

class AvailabilityController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date);

    const appointments = await Appointment.find({
      provider: req.id,
      date: { $gte: startOfMonth(searchDate), $lt: endOfMonth(searchDate) },
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      );
      return { hour, available: !hasAppointmentInHour };
    });

    return res.json(availability);
  }
}

export default new AvailabilityController();
