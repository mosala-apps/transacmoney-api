import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { UpdateUserDto } from './user/dto/update-user.dto';
import { RegisterUserDto } from './user/dto/register-user.dto';
import { User } from './user/entities/user.entity';
import { UserCredentialsDto } from './user/dto/login-user.dto';
import { ResetPasswordDto } from './user/dto/reset-password.dto';
import { ForgotPasswordDto } from './user/dto/forgot-password.dto';
import { IUserResponse } from '~/interfaces/user.response.interface';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(
    @Body() createUserDto: RegisterUserDto,
  ): Promise<Partial<IUserResponse>> {
    return this.userService.register(createUserDto);
  }

  @ApiOperation({ summary: `Authentification de l'utilisateur` })
  @Post('login')
  async login(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<Partial<IUserResponse>> {
    return await this.userService.login(userCredentialsDto);
  }
  @ApiOperation({ summary: `Mot de passe de l'utilisateur oublier` })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    return await this.userService.forgotPassword(email);
  }
  @ApiOperation({ summary: `Renitialisation mot de passe utilisateur` })
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.userService.resetPassword(resetPasswordDto);
  }
}
