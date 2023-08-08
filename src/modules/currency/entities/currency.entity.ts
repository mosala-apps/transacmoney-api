import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransactionEnum, StatusTrasaction } from 'src/enums/transaction.enum';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
import { User } from '~/modules/auth/user/entities/user.entity';

@Entity('currencies')
export class Currency extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

}
