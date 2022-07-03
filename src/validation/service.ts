import * as Joi from 'joi';

const serviceValidationSchema = Joi.object({
  name: Joi.string().required().trim(false).min(6).max(50),
  description: Joi.string().required(),
  price: Joi.number().required(),
  cleaner: Joi.string().required(),
}).unknown();

export {
  serviceValidationSchema,
}
