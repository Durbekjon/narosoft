import { mongoose } from "mongoose";
import logger from "../utils/logger.js";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.destroyed("Internet connection lost!");
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export default connect;
