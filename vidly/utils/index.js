const Joi = require("joi");

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
  validateGenre,
  validateCustomer,
  validateMovie,
  validateRental,
  validateRegister,
  validateLogin,
};
