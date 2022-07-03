import { Request, Response } from 'express';
import User from '../models/User';
import SecurityService from '../services/security-service';
import errors from '../errors/errors';

export default class UserController {

  async createUser(request: Request, response: Response) {

    const { login, password } = request.body;
    let candidate = await User.findOne({ login });

    if (candidate) {
      response.status(404);
      return response.json(errors.BAD_REQUEST_USER_EXIST);
    }

    const data = { ...request.body }
    data.password = await SecurityService.generatePswdHash(password);
    data.balance = UserController.getBalance();

    let user;
    try {
      user = new User(data);

      await user.save();
    } catch (e) {
      return response.json(errors.DB_ERROR);
    }

    const token = SecurityService.generateToken(user.login, user.id, user.role);

    response.json({
      token: `Bearer ${token}`,
    })
  }

  async loginUser(request: Request, response: Response) {

    const { login, password } = request.body;
    let user = await User.findOne({ login });
    if (!user) {
      response.status(404);
      return response.json(errors.BAD_REQUEST_USER_NOT_FOUND);
    }

    const passwordIsMatch = SecurityService.validatePswd(user.password, password);
    if (!passwordIsMatch) {
      response.status(404)
      return response.json(errors.BAD_REQUEST_WRONG_PASSWORD)
    }

    const token = SecurityService.generateToken(user.login, user.id, user.role);

    response.json({
      token: `Bearer ${token}`,
    })
  }

  async resetPassword(request: Request, response: Response) {
    const { login, newPassword } = request.body;
    let user = await User.findOne({ login });
    if (!user) {
      response.status(404);
      return response.json(errors.BAD_REQUEST_USER_NOT_FOUND);
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
