import mongoose from 'mongoose';

const AppointmentsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'users',
    },
    provider: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Appointment', AppointmentsSchema);
