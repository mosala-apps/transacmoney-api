import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { StatusTrasaction, TransactionEnum } from '~/enums/transaction.enum';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty()
  @IsNotEmpty()
  type: TransactionEnum;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  finalExecutorId: number;

  @ApiProperty()
  @IsNotEmpty()
  status: StatusTrasaction;
}
