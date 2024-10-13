import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { UserCredentialsDto } from './dto/login-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Creation compte utilisateur' })
  @Post('register')
  create(@Body() createUserDto: RegisterUserDto): Promise<Partial<User>> {
    return this.userService.register(createUserDto);
  }

  @ApiOperation({ summary: `Authentification de l'utilisateur` })
  @Post('login')
  async login(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<Partial<User>> {
    return await this.userService.login(userCredentialsDto);
  }

  @ApiOperation({ summary: `Mot de passe de l'utilisateur oublier` })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    return await this.userService.forgotPassword(email);
  }

  @ApiOperation({ summary: `Renitialisation ;ot de passe utilisateur` })
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.userService.resetPassword(resetPasswordDto);
  }

  @ApiOperation({ summary: `Obtenir la liste de tous les utilisateurs` })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: `Obtenir la liste de tous les utilisateurs` })
  @Get()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
