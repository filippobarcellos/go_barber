import { startOfHour, parseISO } from 'date-fns';
import Appointment from '../models/Appointment';

exports.createAppointment = async (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = parseISO(date);

  const appointmentDate = startOfHour(parsedDate);

  const findAppointmenteInSameDate = await Appointment.findOne({
    date: appointmentDate,
  });

  if (findAppointmenteInSameDate) {
    return res
      .status(400)
      .json({ error: 'This appointment is already booked' });
  }

  const appointment = await Appointment.create({
    date: appointmentDate,
    provider,
  });

  return res.json(appointment);
};

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find();

  return res.json(appointments);
};
