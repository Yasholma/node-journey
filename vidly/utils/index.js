const Joi = require("joi");
const mongoose = require("mongoose");

const dbOptions = {
  url: "mongodb://localhost/vidly",
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
};

const connectDB = async () => {
  try {
    mongoose.connect(dbOptions.url, { ...dbOptions.options });
    mongoose.set("useCreateIndex", true);
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

const validateRegister = (user) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255),
  }).validate(user);

const validateLogin = (user) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255),
  }).validate(user);

module.exports = {
  dbOptions,
  connectDB,
  validateGenre,
  validateCustomer,
  validateMovie,
  validateRental,
  validateRegister,
  validateLogin,
};
