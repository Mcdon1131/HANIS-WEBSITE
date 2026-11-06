import mongoose from "mongoose";

const connectDb = async (dbURI) => {
  try {
    await mongoose.connect(dbURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
  }
};

export default connectDb;
