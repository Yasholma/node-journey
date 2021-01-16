require("express-async-errors");
const config = require("config");
const express = require("express");
const { connectDB } = require("./utils");
const error = require("./middlewares/error");
const genresRoutes = require("./routes/genres");
const customerRoutes = require("./routes/customers");
const movieRoutes = require("./routes/movies");
const rentalRoutes = require("./routes/rentals");
const authRoutes = require("./routes/auth");

const { dbOptions } = require("./utils");
const { loggers, transports } = require("winston");
require("winston-mongodb");

loggers.add("vidly-log", {
  transports: [
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

const e = Promise.reject(new Error("Error ooo"));

e.then((r) => console.log(r));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivate key is not defined");
  process.exit(0);
}

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/genres", genresRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/auth", authRoutes);

// error handling
app.use(error);

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
