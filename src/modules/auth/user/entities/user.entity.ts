import { UserRoleEnum } from 'src/enums/role-role.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
import { Agency } from '~/modules/agency/entities/agency.entity';
import { SubAgency } from '~/modules/sub-agency/entities/sub-agency.entity';

@Entity('users')
// @Unique(['username', 'email'])
export class User extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.ADMIN,
  })
  role: string;

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column({ type: 'datetime', nullable: true })
  resetPasswordCode?: string;

  @Column({ type: 'datetime', nullable: true })
  resetPasswordDate: Date;

  @ManyToOne(() => Agency, (agency) => agency.usersAgeny)
  agency: Agency;

  @ManyToOne(() => SubAgency, (subAgency) => subAgency.usersSubAgeny)
  // @JoinColumn({ name: 'sub_agency' })
  subAgency: SubAgency;

  @OneToMany(() => Agency, (agency) => agency.responsible)
  agencyResponsible?: Agency;
}
