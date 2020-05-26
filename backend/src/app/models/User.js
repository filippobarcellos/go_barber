import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function () {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

UserSchema.methods.checkPassword = function (requestedPassword) {
  return bcrypt.compare(requestedPassword, this.password);
};

export default mongoose.model('User', UserSchema);
