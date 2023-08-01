import { Module } from '@nestjs/common';
import { TransactionTypeService } from './transaction_type.service';
import { TransactionTypeController } from './transaction_type.controller';

@Module({
  controllers: [TransactionTypeController],
  providers: [TransactionTypeService]
})
export class TransactionTypeModule {}
