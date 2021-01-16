const { loggers } = require("winston");

module.exports = (err, req, res, next) => {
  loggers.get("vidly-log").error(err.message, err);
  res.status(500).send("Something happened");
};
