import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommsionType } from '~/enums/commision-type.enum';

export class CommisionInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: CommsionType;
}
