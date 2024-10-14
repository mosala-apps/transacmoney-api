import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { IUserResponse } from '~/interfaces/user.response.interface';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: `Obtenir la liste de tous les utilisateurs` })
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('sub-agents')
  findAllSubAgents() {
    return this.userService.findAllSubAgents();
  }
  @Post('store')
  create(
    @Body() createUserDto: RegisterUserDto,
  ): Promise<Partial<IUserResponse>> {
    return this.userService.register(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
