import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//XiQS05OQfUgy4wIM
mongoose.set('strictQuery', false)
console.log("URI from dotenv: ", process.env.MONGO_URI ? "Found" : "Missing");
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const db = mongoose.connection;

export default db;
