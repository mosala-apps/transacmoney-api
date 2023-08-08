import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { StatusTrasaction, TransactionEnum } from '~/enums/transaction.enum';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  type: TransactionEnum;

  @ApiProperty()
  @IsNotEmpty()
  expeditorId: number;

  @ApiProperty()
  @IsNotEmpty()
  recipientId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  executorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  currencyId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  countryFrom: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  countryTo: number;

  @ApiProperty()
  status: StatusTrasaction;
  
  @ApiProperty()
  @IsNumber()
  amountWithCommision: number;
}
