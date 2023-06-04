import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseAgencyEntity } from '~/ORM/base-entities/base-agency.entity';
import { Account } from '~/modules/account/entities/account.entity';

@Entity('agencies')
export class Agency extends BaseAgencyEntity {
  @OneToOne(() => Account, (account) => account.agency)
  @JoinColumn()
  account: Account;
}
