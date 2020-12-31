import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    provider: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Appointment', AppointmentSchema);
