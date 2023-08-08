import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransactionEnum, StatusTrasaction } from 'src/enums/transaction.enum';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
import { User } from '~/modules/auth/user/entities/user.entity';

@Entity('countries')
export class Country extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;
}
