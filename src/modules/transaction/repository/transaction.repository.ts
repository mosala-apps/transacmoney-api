import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Transactions } from '../entities/transaction.entity';
import { ITransactionResponse } from '~/interfaces/transaction.response.interface';
import { AccountService } from '~/modules/account/account.service';

@Injectable()
export class TransactionRepository extends Repository<Transactions> {
  constructor(private accountService: AccountService, dataSource: DataSource) {
    super(Transactions, dataSource.createEntityManager());
  }

  async userTransactions(id: number) {
  return await this
    .createQueryBuilder("q")
    .where("q.expeditor = :id OR q.recipient = :id", { id })
    .select([
      "q.id",
      "q.updatedAt",
      "q.status",
      "q.type",
      "q.expeditor",
      "q.recipient",
      "q.executor"
    ])
    .getMany();
  }

  async updateAccountAmount(idAccount: number, newAmount: number) {
    this.accountService.updateAmount(idAccount, newAmount)
  }
  
}
