import mongoose from "mongoose";

export const connectDB = async () => {
    console.log("Connecting to MongoDB...");
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Successfully connect to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // exit with the error
    }
}