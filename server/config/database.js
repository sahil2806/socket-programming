import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

export const connect = async ()=>{
    await mongoose.mongoose.connect(MONGODB_URL);
}
