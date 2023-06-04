import { jwtConstants } from '~/modules/auth/constants';
import { IUserResponse } from '~/interfaces/user.response.interface';
import { JwtService } from '@nestjs/jwt';
import { ITalentResponse } from '~/interfaces/talent.response.interface';

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
  generateJWT(user: Partial<IUserResponse>) {
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

  renderUserResponse(user: Partial<IUserResponse>): IUserResponse {
    try {
      const payload: IUserResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        access_token: this.generateJWT(user),
      };
      return payload;
    } catch (error) {
    } finally {
    }
  }

  renderTalentResponse(user: Partial<ITalentResponse>): ITalentResponse {
    try {
      const payload: ITalentResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        talentId: user.talentId,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        experience: user.experience,
        level: user.level,
        education: user.education,
        githubLink: user.githubLink,
        websiteLink: user.websiteLink,
        location: user.location,
        phone: user.phone,
        isActive: user.isActive,
        access_token: this.generateJWT(user),
      };
      return payload;
    } catch (error) {
    } finally {
    }
  }
}
