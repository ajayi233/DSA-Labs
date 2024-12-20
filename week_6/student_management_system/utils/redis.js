const Redis = require("redis");
const logger = require("./logger");

const redisClient = Redis.createClient({
  port: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  logger.error("Redis client error: ", err);
});

redisClient.on("connect", () => {
  logger.info("Redis client connected");
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    logger.error("Redis client error: ", err);
  }
};

module.exports = { redisClient, connectRedis };
