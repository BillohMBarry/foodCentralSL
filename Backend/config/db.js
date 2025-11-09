import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

export const connectDB = async () => {
  try {
    const MongoDB = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${MongoDB.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure  
  }
}  