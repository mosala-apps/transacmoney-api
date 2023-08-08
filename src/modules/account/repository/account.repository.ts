import { DataSource, Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { IUpdateAmountParams } from '~/helpers';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }

  async retrieveAmount(
    newAmount: number,
    { agency, subAgency }: IUpdateAmountParams,
  ) {
    let account;
    if (agency) {
      account = await this.findOneOrFail({
        where: {
          agency: {
            id: agency,
          },
        },
        select: {
          amount: true,
        },
      });
    } else {
      account = await this.findOneOrFail({
        where: {
          subAgency: {
            id: subAgency,
          },
        },
        select: {
          amount: true,
        },
      });
    }

    if (account.amount - newAmount < 0)
      throw new NotAcceptableException('Fond insuffisant dans le compte !');

    return await this.update(account.id, {
      amount: account.amount - newAmount,
    });
  }

  async addAmount(
    newAmount: number,
    { agency, subAgency }: IUpdateAmountParams,
  ) {
    let account;
    if (agency) {
      account = await this.findOneOrFail({
        where: {
          agency: {
            id: agency,
          },
        },
        select: {
          amount: true,
        },
      });
    } else {
      account = await this.findOneOrFail({
        where: {
          subAgency: {
            id: subAgency,
          },
        },
        select: {
          amount: true,
        },
      });
    }

    return await this.update(account.id, {
      amount: account.amount + newAmount,
    });
  }
}
