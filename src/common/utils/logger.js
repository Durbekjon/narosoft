import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      const levelColored = `\x1b[35m${level}\x1b[0m`;
      const messageColored = `\x1b[32m${message}\x1b[0m`;
      return ` [${levelColored}]: ${messageColored} [${timestamp}]`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
