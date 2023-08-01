import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransactionEnum, StatusTrasaction } from "src/enums/transaction.enum"
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';

@Entity('transactions')
export class Transactions extends TimesTampEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionEnum,
  })
  type: string;

  @Column()
  expeditor: number;

  @Column()
  recipient: number;

  @Column()
  amount: number;

  @Column()
  executor: number;

  @Column({ 
    type: 'enum',
    enum: StatusTrasaction,
    default: StatusTrasaction.IN_PROGRESS
  })
  status: string;
}
