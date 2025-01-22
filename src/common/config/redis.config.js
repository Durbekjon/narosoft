import Redis from "ioredis";
import logger from "../utils/logger.js";

const redis = new Redis();
const redisConfig = () => {
  redis.on("connect", () => {
    logger.info("Connected to Redis");
  });

  redis.on("error", (err) => {
    logger.error("Redis connection error:");
    redis.quit();
  });
};
export { redisConfig, redis };