import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserCredentialsDto {
  @ApiProperty()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
