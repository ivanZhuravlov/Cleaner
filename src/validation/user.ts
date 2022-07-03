import * as Joi from 'joi';

const userSignInSchema = Joi.object({
  password: Joi.string().required().trim(false).min(6).max(50),
  login: Joi.string().required().max(129).email(),
})

const userSignUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required().trim(false).min(6).max(50),
  login: Joi.string().required().max(129).email(),
  role: Joi.boolean().valid(1, 0),
})

export {
  userSignInSchema,
  userSignUpSchema
}
