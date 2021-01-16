const { json, urlencoded } = require("express");
const genresRoutes = require("../routes/genres");
const customerRoutes = require("../routes/customers");
const movieRoutes = require("../routes/movies");
const rentalRoutes = require("../routes/rentals");
const authRoutes = require("../routes/auth");
const error = require("../middlewares/error");

// middlewares and routes
module.exports = (app) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use("/api/genres", genresRoutes);
  app.use("/api/customers", customerRoutes);
  app.use("/api/movies", movieRoutes);
  app.use("/api/rentals", rentalRoutes);
  app.use("/api/auth", authRoutes);
  // error handling
  app.use(error);
};
