import { Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseAgencyEntity } from '~/ORM/base-entities/base-agency.entity';
import { Account } from '~/modules/account/entities/account.entity';
import { User } from '~/modules/auth/user/entities/user.entity';

@Entity('sub_agencies')
export class SubAgency extends BaseAgencyEntity {
  @OneToOne(() => Account, (account) => account.subAgency)
  @JoinColumn()
  account: Account;

  @OneToMany(() => User, (user) => user.subAgency)
  @JoinColumn({ name: 'users_sub_agency' })
  usersSubAgeny: User[];
}
