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
  status: StatusTrasaction;
}
