import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
import { Agency } from '~/modules/agency/entities/agency.entity';
import { SubAgency } from '~/modules/sub-agency/entities/sub-agency.entity';

@Entity('accounts')
export class Account extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  accountNumber: number;

  @Column({ type: 'float', default: 0.0 })
  amount: number;

  @OneToOne(() => Agency, (agency) => agency.account)
  agency?: Agency;

  @OneToOne(() => SubAgency, (subAgency) => subAgency.account)
  subAgency?: SubAgency;
}
