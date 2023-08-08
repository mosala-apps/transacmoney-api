import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AccountService } from '~/modules/account/account.service';
import { IUpdateAmountParams } from '~/helpers';
import { Currency } from '../entities/currency.entity';

@Injectable()
export class CurrencyRepository extends Repository<Currency> {
  constructor(dataSource: DataSource) {
    super(Currency, dataSource.createEntityManager());
  }
}
