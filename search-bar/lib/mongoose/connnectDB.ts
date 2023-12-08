import mongoose from 'mongoose';

// Mongo compass cluster에 접속
const connnectDB = async () => {
  try {
    if (process.env.MONGO_URI) {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected ${conn.connection.host}`);
    }
  } catch (error: { message: string } | null | undefined | unknown | any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connnectDB;
