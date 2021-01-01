import {
  startOfMonth,
  endOfMonth,
  getDate,
  getDaysInMonth,
  parseISO,
} from 'date-fns';
import Appointment from '../models/Appointment';

class AvailabilityController {
  async index(req, res) {
    const { year, month } = req.query;

    const parsedDate = parseISO(year, month);

    const appointments = await Appointment.find({
      provider: req.params.id,
      date: { $gte: startOfMonth(parsedDate), $lt: endOfMonth(parsedDate) },
    });

    const numberOfDaysinMonth = getDaysInMonth(new Date(year, month - 1));

    const monthArray = Array.from(
      { length: numberOfDaysinMonth },
      (value, index) => index + 1,
    );

    const availability = monthArray.map((day) => {
      const appointmentsInDay = appointments.filter(
        (appointment) => getDate(appointment.date) === day,
      );
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return res.json(availability);
  }
}

export default new AvailabilityController();
