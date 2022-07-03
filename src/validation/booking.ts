import * as Joi from 'joi';

const bookingValidationSchema = Joi.object({
  id: Joi.string().required(),
})

export {
  bookingValidationSchema
}
