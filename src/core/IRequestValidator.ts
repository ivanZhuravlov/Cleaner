import * as Joi from 'joi';

export default interface IRequestValidator {
  validate: (request: any) => Joi.ValidationResult;
}