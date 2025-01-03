const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "student-management-system" },
  transports: [
    new winston.transports.File({
      filename: "./loggedFiles/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./loggedFiles/info.log",
      level: "info",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
