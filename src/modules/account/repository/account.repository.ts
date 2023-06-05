import { DataSource, Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }
}
