const Joi = require("joi");

module.exports = validateCourse = (course) => {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(course);
};
