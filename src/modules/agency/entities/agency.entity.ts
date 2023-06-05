import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseAgencyEntity } from '~/ORM/base-entities/base-agency.entity';
import { Account } from '~/modules/account/entities/account.entity';
import { User } from '~/modules/auth/user/entities/user.entity';

@Entity('agencies')
export class Agency extends BaseAgencyEntity {
  @OneToOne(() => Account, (account) => account.agency)
  @JoinColumn()
  account: Account;

  @OneToMany(() => User, (user) => user.agency)
  @JoinColumn({ name: 'users_agency' })
  usersAgeny: User[];

}
