const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://fbarcellos:18081990@cluster0-ukzai.mongodb.net/goBarber?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    );
  } catch (err) {
    return res.status(500).json({ err: 'Server is not available' });
  }
};

module.exports = connectDB;
