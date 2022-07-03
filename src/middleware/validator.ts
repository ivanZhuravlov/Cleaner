import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

type RequestValidator = {
  validate: (request: any) => Joi.ValidationResult;
}

export default (validationSchema: RequestValidator) => (request: Request, response: Response, next: NextFunction) => {
  const { body } = request;

  const result = validationSchema.validate(body);

  const { error } = result;

  if (error) {
    response.json({ error: error.message });
    return;
  }

  next();
}
