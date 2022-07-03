import { NextFunction, Request, Response } from 'express';
import errors from '../errors/errors';

interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string,
    role: number,
    login: string,
  }
}

export default async (request: IGetUserAuthInfoRequest, response: Response, next: NextFunction) => {
  console.log('admin middleware:', { role: request.user.role });

  if (request.user.role !== 1) {
    response.status(403);
    response.json(errors.BAD_REQUEST_ACCESS_DENIED);
    return
  }

  next();
}
