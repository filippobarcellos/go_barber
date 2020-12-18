import mongoose from 'mongoose';

const connection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://filippo:18081990@cluster0.ukzai.mongodb.net/gobarber?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connection;
