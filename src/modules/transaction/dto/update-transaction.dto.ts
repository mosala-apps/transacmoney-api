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
  final_executor: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  executor: number;

  @ApiProperty()
  @IsNotEmpty()
  status: StatusTrasaction;
}
