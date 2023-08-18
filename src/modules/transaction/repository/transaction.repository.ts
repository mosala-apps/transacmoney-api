import { DataSource, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Transactions } from '../entities/transaction.entity';
import { ITransactionResponse } from '~/interfaces/transaction.response.interface';
import { AccountService } from '~/modules/account/account.service';
import { IUpdateAmountParams, StatsData } from '~/helpers';
import { User } from '~/modules/auth/user/entities/user.entity';




@Injectable()
export class TransactionRepository extends Repository<Transactions> {
  constructor(private accountService: AccountService, dataSource: DataSource) {
    super(Transactions, dataSource.createEntityManager());
  }

  async userTransactions(id: number) {
    return await this.createQueryBuilder('q')
      .where('q.expeditor = :id OR q.recipient = :id', { id })
      .select([
        'q.id',
        'q.updatedAt',
        'q.status',
        'q.type',
        'q.expeditor',
        'q.recipient',
        'q.executor',
      ])
      .getMany();
  }

  async retrieveAccountAmount(newAmount: number, data: IUpdateAmountParams) {
    this.accountService.retrieveAmount(newAmount, data);
  }

  async addAccountAmount(newAmount: number, data: IUpdateAmountParams) {
    this.accountService.addAmount(newAmount, data);
  }

  async statistiqueIntervention(currentUser: User, currencyId, dateBegin: Date, dateEnd: Date): Promise<StatsData[]>{
    const transactions = await this.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.finalExecutor', 'finalExecutor')
      .leftJoinAndSelect('transaction.executor', 'executor')
      .leftJoinAndSelect('transaction.currency', 'currency')
      .where('finalExecutor.id = :userId OR executor.id = :userId', { userId: currentUser.id })
      .andWhere('transaction.currency.id = :currencyId', { currencyId: currencyId })
      .andWhere('transaction.updatedAt BETWEEN :dateBegin AND :dateEnd', { dateBegin, dateEnd })
      .getMany();

    const commissionStatistics = transactions.map(transaction => {
    const comission = (transaction?.amountWithCommision || 0) - (transaction?.amount || 0);
    return {
      transaction,
      comission,
      };
    });
  
    return commissionStatistics;
  } 

  async allStatistiqueIntervention(finalExecutors: string[], currencyId, dateBegin: Date, dateEnd: Date): Promise<StatsData[]>{
    const transactions = await this.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.finalExecutor', 'finalExecutor')
      .leftJoinAndSelect('transaction.executor', 'executor')
      .leftJoinAndSelect('transaction.currency', 'currency')
      .where('finalExecutor.id = :userId OR executor.id = :userId', { userId: In(finalExecutors) })
      .andWhere('transaction.currency.id = :currencyId', { currencyId: currencyId })
      .andWhere('transaction.updatedAt BETWEEN :dateBegin AND :dateEnd', { dateBegin, dateEnd })
      .getMany();

    const commissionStatistics = transactions.map(transaction => {
    const comission = (transaction?.amountWithCommision || 0) - (transaction?.amount || 0);
    return {
      transaction,
      comission,
      };
    });
  
    return commissionStatistics;
  }

  async statistiqueInterventionUser(currentUser: User, currencyId, dateBegin: Date, dateEnd: Date): Promise<Transactions[]>{
    const transactions = await this.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.expeditor', 'expeditor')
      .leftJoinAndSelect('transaction.recipient', 'recipient')
      .leftJoinAndSelect('transaction.currency', 'currency')
      .where('expeditor.id = :userId OR recipient.id = :userId', { userId: currentUser.id })
      .andWhere('transaction.currency.id = :currencyId', { currencyId: currencyId })
      .andWhere('transaction.updatedAt BETWEEN :dateBegin AND :dateEnd', { dateBegin, dateEnd })
      .getMany();
  
    return transactions;
  }

  async allStatistiqueInterventionUser(executors: string[], currencyId, dateBegin: Date, dateEnd: Date): Promise<StatsData[]>{
    const transactions = await this.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.expeditor', 'expeditor')
      .leftJoinAndSelect('transaction.recipient', 'recipient')
      .leftJoinAndSelect('transaction.currency', 'currency')
      .where('expeditor.id = :userId OR recipient.id = :userId', { userId: In(executors) })
      .andWhere('transaction.currency.id = :currencyId', { currencyId: currencyId })
      .andWhere('transaction.updatedAt BETWEEN :dateBegin AND :dateEnd', { dateBegin, dateEnd })
      .getMany();

    const commissionStatistics = transactions.map(transaction => {
    const comission = (transaction?.amountWithCommision || 0) - (transaction?.amount || 0);
    return {
      transaction,
      comission,
      };
    });
  
    return commissionStatistics;
  }
}
