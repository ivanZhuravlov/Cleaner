import { NextFunction, Request, Response } from 'express';
import IGetUserInfoRequest from '../core/IGetUserInfoRequest';
import errors from '../errors/errors';

export default async (request: IGetUserInfoRequest, response: Response, next: NextFunction) => {
  console.log('admin middleware:', { role: request.user.role });

  if (request.user.role !== 1) {
    response.status(403);
    response.json(errors.BAD_REQUEST_ACCESS_DENIED);
    return
  }

  next();
}
