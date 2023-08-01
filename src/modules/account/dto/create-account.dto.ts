import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  accountNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
