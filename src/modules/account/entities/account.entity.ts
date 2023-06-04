import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
import { Agency } from '~/modules/agency/entities/agency.entity';
import { SubAgency } from '~/modules/sub-agency/entities/sub-agency.entity';

export class Account extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: BigInteger;

  @Column({ type: 'datetime', default: new Date() })
  openingDate: Date;

  @OneToOne(() => Agency, (agency) => agency.account)
  agency: Agency;

  @OneToOne(() => SubAgency, (subAgency) => subAgency.account)
  subAgency: SubAgency;
}
