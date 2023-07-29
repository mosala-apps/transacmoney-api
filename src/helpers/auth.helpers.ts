import { jwtConstants } from '~/modules/auth/constants';
import { IUser, IUserResponse } from '~/interfaces/user.response.interface';
import { JwtService } from '@nestjs/jwt';

export class AuthHelpers {
  private jwtService: JwtService;
  private static instance = null;
  constructor() {
    this.jwtService = new JwtService();
  }
  static getInstance() {
    if (AuthHelpers.instance === null) {
      AuthHelpers.instance = new AuthHelpers();
    }
    return AuthHelpers.instance;
  }
  generateJWT(user: Partial<IUser>) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return this.jwtService.sign(
      {
        id: user.id,
        username: user.username,
        exp: exp.getTime() / 1000,
        email: user.email,
      },
      {
        secret: jwtConstants.secret,
      },
    );
  }

  renderUserResponse(payload: Partial<IUser>): IUserResponse {
    try {
      const response: IUserResponse = {
        user: {
          id: payload.id,
          username: payload.username,
          email: payload.email,
          role: payload.role,
          isActive: payload.isActive,
          agency: payload?.agency,
          subAgency: payload?.subAgency,
        },
        access_token: this.generateJWT(payload),
      };
      return response;
    } catch (error) {
    } finally {
    }
  }
}
