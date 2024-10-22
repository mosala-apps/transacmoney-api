import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseAgencyEntity } from '~/ORM/base-entities/base-agency.entity';
import { AgencyTypeEnum } from '~/enums/agency-type.enum';
import { Account } from '~/modules/account/entities/account.entity';
import { User } from '~/modules/auth/user/entities/user.entity';
import { City } from '~/modules/city/entities/city.entity';

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
  usersAgency: User[];

  @OneToOne(() => User, (user) => user.agencyResponsible, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'responsible_id' })
  responsible: User;

  @ManyToOne(() => City, (city) => city.agencies, {
    nullable: true,
  })
  city: City;
}
