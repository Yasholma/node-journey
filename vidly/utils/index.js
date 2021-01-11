const Joi = require("joi");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost/vidly", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Successfully connected to the database");
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
};

const validateGenre = (genre) =>
  Joi.object({ title: Joi.string().min(3).required() }).validate(genre);

const validateCustomer = (customer) =>
  Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean(),
  }).validate(customer);

const validateMovie = (movie) =>
  Joi.object({
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  }).validate(movie);

const validateRental = (rental) =>
  Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  }).validate(rental);

module.exports = {
  connectDB,
  validateGenre,
  validateCustomer,
  validateMovie,
  validateRental,
};
