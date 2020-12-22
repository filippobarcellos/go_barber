import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import localhostConfig from '../../config/localhost';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    provider: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
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

UserSchema.virtual('avatar_url').get(function () {
  return `http://${localhostConfig.LOCALHOST}:3333/files/${this.avatar}`;
});

export default mongoose.model('User', UserSchema);
