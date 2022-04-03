const Joi = require("joi");

const schemas = {
  registerValidation: Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
  }),
  loginValidation: Joi.object({
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255),
  }),
};

module.exports = schemas;
