const mongoose = require("mongoose");
const { loggers } = require("winston");

const dbOptions = {
  url: "mongodb://localhost/vidly",
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
};

const connectDB = () => {
  mongoose.connect(dbOptions.url, { ...dbOptions.options }).then(() => {
    loggers.get("vidly-log").info("Successfully connected to the database");
  });
  mongoose.set("useCreateIndex", true);
};

module.exports = {
  dbOptions,
  connectDB,
};
