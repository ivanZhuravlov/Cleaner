import { NextFunction, Request, Response } from 'express';
import IRequestValidator from '../core/IRequestValidator';

export default (validationSchema: IRequestValidator) => (request: Request, response: Response, next: NextFunction) => {
  const { body } = request;

  const result = validationSchema.validate(body);

  const { error } = result;

  if (error) {
    response.json({ error: error.message });
    return;
  }

  next();
}
