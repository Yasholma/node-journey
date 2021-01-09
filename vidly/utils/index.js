const Joi = require("joi");
const mongoose = require("mongoose");

const validateGenre = (genre) =>
  Joi.object({ title: Joi.string().min(3).required() }).validate(genre);

const validateCustomer = (customer) =>
  Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean().optional(),
  }).validate(customer);

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

module.exports = {
  validateGenre,
  validateCustomer,
  connectDB,
};
