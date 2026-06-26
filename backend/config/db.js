import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DataBase Connected Successfuly");
  } catch (error) {
    console.error("DataBase Connection Error", error.message);
    process.exit(1);
  }
};
export default connectDB;