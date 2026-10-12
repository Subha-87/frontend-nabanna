import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_LOCAL_URI;

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in env or Detected");
    } else if (mongoose.connection.readyState === 1) {
      console.log("DB is already Connected");
      return;
    }
    //await mongoose.connect(process.env.MONGODB_LOCAL_URI)
    await mongoose.connect(MONGO_URI);
    console.log("FrontEnd MongoDB Connected : New Connection is Made");
  } catch (error) {
    console.error("DataBase Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB
