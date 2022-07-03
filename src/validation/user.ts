import * as Joi from 'joi';

const userSignInSchema = Joi.object({
  password: Joi.string().required().trim(false).min(6).max(50),
  login: Joi.string().required().max(129).email(),
}).required();

const userSignUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required().trim(false).min(6).max(50),
  login: Joi.string().required().max(129).email(),
  role: Joi.boolean().valid(1, 0),
}).required();

const passportResetSchema = Joi.object({
  newPassword: Joi.string().required().trim(false).min(6).max(50),
  login: Joi.string().required().max(129).email(),
}).required();

export {
  userSignInSchema,
  userSignUpSchema,
  passportResetSchema
}
