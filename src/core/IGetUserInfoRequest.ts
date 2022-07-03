import { Request } from 'express';

export default interface IGetUserInfoRequest extends Request {
  user: {
    id: string,
    role: number,
    login: string,
    balance: number
  }
}
