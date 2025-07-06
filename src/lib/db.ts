import mongoose from 'mongoose';
import { env } from 'process';

export const connectDB = async () => {
  try {
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/finance';
   mongoose.connect(uri);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

};


