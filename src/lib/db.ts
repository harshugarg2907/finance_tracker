import mongoose from 'mongoose';
import { env } from 'process';

export const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/finance');
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

};


