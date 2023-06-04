import { Injectable } from '@nestjs/common';
import { MailerService as NodeMailerService } from '@nestjs-modules/mailer';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { User } from '../auth/user/entities/user.entity';
import { IForgotPasswordResponse } from '~/interfaces/forgot-password-response.interface';

@Injectable()
export class MailerService {
  constructor(
    private readonly nodeMailerService: NodeMailerService,
    private configSevice: ConfigService,
  ) {}
  async sendForgotPasswordMail(user: User): Promise<IForgotPasswordResponse> {
    const code = this.generateCode();
    try {
      await this.nodeMailerService.sendMail({
        to: user && user.email,
        subject: 'Réinitialisation du mot passe',
        template: './forgot-password',
        context: {
          url: `${this.configSevice.get(
            'APP_URL',
          )}/auth/forgot-password/${code}`,
          user,
        },
      });
      return { code, message: 'Le mail envoyé avec succès' };
    } catch (error) {
      throw new Error("Echec d'envoi de mail Réinitialisation du mot passe ");
    }
  }
  generateCode(): string {
    return faker.datatype
      .uuid()
      .split('')
      .filter((item) => item !== '-')
      .join('');
  }
}
