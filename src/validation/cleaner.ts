import * as Joi from 'joi';

const createCleanerValidationSchema = Joi.object({
  name: Joi.string().required().trim(false).min(6).max(50),
  description: Joi.string().required(),
});




export {
  createCleanerValidationSchema,
}
