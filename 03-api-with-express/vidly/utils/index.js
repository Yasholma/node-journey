const Joi = require("joi");

module.exports = validateGenre = (genre) => {
  const schema = Joi.object({ title: Joi.string().min(3).required() });
  return schema.validate(genre);
};
