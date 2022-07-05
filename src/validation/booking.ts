import * as Joi from 'joi';

const bookingValidationSchema = Joi.object({
  id: Joi.string().required(),
})

const bookingUpdateValidationChema = Joi.object({
  name: Joi.string(),
  date: Joi.date(),
  price: Joi.number(),
  service: Joi.string(),
  status: Joi.number(),
  owner: Joi.string()
}).required()

export {
  bookingValidationSchema,
  bookingUpdateValidationChema
}
