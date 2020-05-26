import mongoose from 'mongoose';

const AppointmentsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Appointment', AppointmentsSchema);
