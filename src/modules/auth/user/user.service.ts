import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserCredentialsDto } from './dto/login-user.dto';
import { IUserResponse } from '../../../interfaces/user.response.interface';
import {
  displayConflictExceptionMessage,
  hashPasswordWithBcrypt,
} from '~/helpers';
import { AuthHelpers } from '~/helpers/auth.helpers';
import { UserRepository } from './repository/user.repositoy';
import { MailerService } from '~/modules/mailer/mailer.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserRoleEnum } from '~/enums/role-role.enum';
import { ITalentResponse } from '~/interfaces/talent.response.interface';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private mailerService: MailerService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<IUserResponse> {
    const user = this.userRepository.create({ ...registerUserDto });

    try {
      const { salt, password } = await hashPasswordWithBcrypt(user.password);
      user.salt = salt;
      user.password = password;

      const userRepo = await this.userRepository.save(user);

      return AuthHelpers.getInstance().renderUserResponse(userRepo);
    } catch (error) {
      displayConflictExceptionMessage(error, 'Cet utilisateur existe déja');
      throw new Error(error);
    }
  }

  async login(
    userCredetials: UserCredentialsDto,
  ): Promise<IUserResponse | ITalentResponse> {
    const { identifier, password } = userCredetials;

    try {
      const userRepo = await this.userRepository.getByIdentifier(identifier);
      if (!userRepo) {
        throw new NotFoundException("cet utilisateur n'existe pas");
      } else {
        const hashPassword = await bcrypt.hash(password, userRepo.salt);
        if (hashPassword === userRepo.password) {
          const userResponse =
            AuthHelpers.getInstance().renderUserResponse(userRepo);
          // if (userRepo.role === UserRoleEnum.TALENT) {
          //  const talentRepo = await this.talentRepository.findByUser(
          // userRepo.id,
          //  );
          // return this.getTalentResponse(userRepo, talentRepo);
          //}
          return userResponse;
        } else {
          throw new NotFoundException('Mot de passe erroné');
        }
      }
    } catch (error) {
      throw new NotFoundException("cet utilisateur n'existe pas");
    }
  }
  async forgotPassword(email): Promise<string> {
    try {
      const user = await this.userRepository.getByIdentifier(email);
      const { code, message } = await this.mailerService.sendForgotPasswordMail(
        user,
      );
      if (code) {
        user.resetPasswordCode = code;
        user.resetPasswordDate = new Date();
        await this.userRepository.save(user);
        return message;
      }
    } catch (error) {
      throw new Error("une erreur s'est produit");
    }
  }
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { code, newPassword } = resetPasswordDto;
    const user = await this.userRepository.findOne({
      where: { resetPasswordCode: code },
    });

    if (user === undefined || user === null) {
      throw new NotFoundException("Vous n'etes pas reconu dans notre systeme");
    } else {
      // on calcule la difference des dates afin de véfifier la validité du code
      const diffDate = this.getDiffDate(user.resetPasswordDate);
      if (diffDate >= 1) {
        return 'Votre code est invalide!';
      }
      const { salt, password: hashPassword } = await hashPasswordWithBcrypt(
        newPassword,
      );
      user.salt = salt;
      user.password = hashPassword;
      const userUpdate = await this.userRepository.save(user);
      if (userUpdate) {
        return 'Mot de passe modifié avec succès !';
      }
      throw new NotFoundException('Echec de modification');
    }
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        id: true,
        username: true,
        email: true,
        isActive: true,
        role: true,
        
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  private getDiffDate(resetPasswordDate: Date): number {
    const diffDate = Math.abs(
      new Date().getDate() - new Date(resetPasswordDate).getDate(),
    );
    return Math.ceil(diffDate / (1000 * 60 * 60 * 24));
  }
}
