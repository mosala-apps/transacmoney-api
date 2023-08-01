import { DataSource, Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Injectable, NotAcceptableException } from '@nestjs/common';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }

  async updateAmount(id: number, newAmount: number) {
    const account = await this.findOneOrFail({
      where: {
        id
      },
      select: {
        amount: true
      }
    })
    if ((account.amount - newAmount) < 0) throw new NotAcceptableException('Fond insuffisant dans le compte !')
    
    return await this.update(id, {amount: account.amount - newAmount})
  }
}
