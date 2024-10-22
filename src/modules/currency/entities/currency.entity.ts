import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transactions } from '~/modules/transaction/entities/transaction.entity';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';

@Entity('currencies')
export class Currency extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;
  @OneToMany(() => Transactions, (transaction) => transaction.currency)
  transactions: Transactions[];

}
