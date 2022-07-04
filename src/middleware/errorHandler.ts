
import { Request, Response, NextFunction } from 'express';
import ServerException from '../errors/ServerExeption';

export default (error: ServerException, request: Request, response: Response, next: NextFunction) => {

  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  response.status(status)
  response.send({
    status,
    message,
  })

}
