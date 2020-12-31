import {
  startOfHour,
  parseISO,
  isBefore,
  getHours,
  getDate,
  format,
} from 'date-fns';
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

//   async index(req, res) {
//     try {
//       const { provider, date } = req.body;

//       const isProvider = await User.findOne({
//         _id: provider,
//         provider: true,
//       });

//       if (!isProvider) {
//         return res.status(401).json({
//           error: 'You are not a provider. Please check your credentials',
//         });
//       }

//       const parsedDate = parseISO(date);

//       const appointments = await Appointment.find({
//         user: req.userId,
//         provider,
//         date: { $gte: startOfMonth(parsedDate), $lt: endOfMonth(parsedDate) },
//       });

//       const hourStart = 8;

//       const eachHourArray = Array.from(
//         { length: 10 },
//         (_, index) => index + hourStart,
//       );

//       const availability = eachHourArray.map((hour) => {
//         const hasAppointmentInHour = appointments.find(
//           (appointment) => getHours(appointment.date) === hour,
//         );
//         return {
//           hour,
//           available: !hasAppointmentInHour,
//         };
//       });
//       return res.json(availability);
//     } catch (error) {
//       return res.status(500).json({ error: 'Server error' });
//     }
//   }
// }
