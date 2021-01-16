require("express-async-errors");
const { transports, loggers, format } = require("winston");
require("winston-mongodb");
const { dbOptions } = require("./db");

module.exports = () => {
  loggers.add("vidly-log", {
    transports: [
      new transports.Console({
        format: format.simple(),
      }),
      new transports.File({ filename: "logfile.log" }),
      new transports.MongoDB({
        db: dbOptions.url,
        options: { ...dbOptions.options },
      }),
    ],
  });

  // handling uncaught exceptions
  process.on("uncaughtException", (ex) => {
    loggers.get("vidly-log").error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    loggers.get("vidly-log").error(ex.message, ex);
    process.exit(1);
  });
};
