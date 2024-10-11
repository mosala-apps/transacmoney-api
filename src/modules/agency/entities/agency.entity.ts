import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseAgencyEntity } from '~/ORM/base-entities/base-agency.entity';
import { AgencyTypeEnum } from '~/enums/agency-type.enum';
import { Account } from '~/modules/account/entities/account.entity';
import { User } from '~/modules/auth/user/entities/user.entity';

@Entity('agencies')
export class Agency extends BaseAgencyEntity {
  @Column({
    type: 'enum',
    enum: AgencyTypeEnum,
    default: AgencyTypeEnum.AGENCY,
  })
  type: string;

  @OneToOne(() => Account, (account) => account.agency)
  @JoinColumn()
  account: Account;

  @OneToMany(() => User, (user) => user.agency)
  @JoinColumn({ name: 'users_agency' })
  usersAgeny: User[];

  @OneToOne(() => User, (user) => user.agencyResponsible)
  @JoinColumn({ name: 'responsible_id' })
  responsible: User;

  
}
