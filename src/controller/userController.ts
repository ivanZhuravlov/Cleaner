import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import SecurityService from '../services/security-service';
import ServerExeption from '../errors/ServerExeption';

export default class UserController {

  async createUser(request: Request, response: Response, next: NextFunction) {

    const { login, password } = request.body;
    let candidate = await User.findOne({ login });

    if (candidate) {
      next(new ServerExeption(404, 'user already exist'))
      return
    }

    const data = { ...request.body }
    data.password = await SecurityService.generatePswdHash(password);
    data.balance = UserController.getBalance();

    let user;
    try {
      user = new User(data);

      await user.save();
    } catch (e) {
      next(new ServerExeption(404, 'failed to seve user into db'));
      return
    }

    const token = SecurityService.generateToken(user.login, user.id, user.role);

    response.json({
      token: `Bearer ${token}`,
    })
  }

  async loginUser(request: Request, response: Response, next: NextFunction) {

    const { login, password } = request.body;
    let user = await User.findOne({ login });
    if (!user) {
      next(new ServerExeption(404, 'user not found'));
      return
    }

    const passwordIsMatch = SecurityService.validatePswd(user.password, password);
    if (!passwordIsMatch) {
      next(new ServerExeption(404, 'incorrect password'));
      return
    }

    const token = SecurityService.generateToken(user.login, user.id, user.role);

    response.json({
      token: `Bearer ${token}`,
    })
  }

  async resetPassword(request: Request, response: Response, next: NextFunction) {
    const { login, newPassword } = request.body;
    let user = await User.findOne({ login });
    if (!user) {
      next(new ServerExeption(404, 'user not found'));
      return
    }

    const password = await SecurityService.generatePswdHash(newPassword);

    await user.updateOne({
      password,
    })

    const token = SecurityService.generateToken(user.login, user.id, user.role);
    response.json({
      token: `Bearer ${token}`,
    })
  }

  static getBalance(): number {
    return Math.floor(Math.random() * 500);
  }
}
