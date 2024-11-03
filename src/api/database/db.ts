import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGODB_URI || "";

export const connectToDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 0) { 
        try {
            await mongoose.connect(uri, {                               
                serverSelectionTimeoutMS: 10000, 
            });
            console.log("Connected to MongoDB with Mongoose");
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
        }
    }
};