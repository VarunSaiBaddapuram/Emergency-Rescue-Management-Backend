import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../common/logger/logger";

dotenv.config();

//XiQS05OQfUgy4wIM
mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => logger.info("Mongoose connected successfully"))
  .catch((err) => logger.error({ err }, "MongoDB connection error"));

const db = mongoose.connection;

export default db;
