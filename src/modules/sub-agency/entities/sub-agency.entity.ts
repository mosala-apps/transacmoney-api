import { Entity, OneToOne, JoinColumn } from 'typeorm';
import { BaseAgencyEntity } from '~/ORM/base-entities/base-agency.entity';
import { Account } from '~/modules/account/entities/account.entity';

@Entity('base_agencies')
export class SubAgency extends BaseAgencyEntity {
  @OneToOne(() => Account, (account) => account.subAgency)
  @JoinColumn()
  account: Account;
}
