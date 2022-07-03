import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt-config'

export default class SecurityService {

  static async generatePswdHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(6);
    const hash = await bcrypt.hash(password, salt);
    return hash
  }

  static generateToken(login: string, userId: string, userRole: number): string {
    const token = jwt.sign(
      {
        login,
        userId,
        userRole,
      },
      jwtConfig,
      { expiresIn: 3600 },
    )

    return token
  }

  static validatePswd(userPassword: string, requestPassword: string): boolean {
    return bcrypt.compareSync(requestPassword, userPassword);
  }
}