import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { UserRoleEnum } from '~/enums/role-role.enum';

export class RegisterUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('CD')
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  // @IsEnum({ default: UserRoleEnum.ADMIN })
  role: UserRoleEnum;

  @ApiProperty()
  @IsOptional()
  agencyId: number;

  @ApiProperty()
  @IsOptional()
  subAgencyId: number;
}
