const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // Default log level
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Logs to the console
    new transports.File({ filename: "logs/app.log" }), // Logs to a file
  ],
});

module.exports = logger;
