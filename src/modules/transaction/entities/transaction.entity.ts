import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransactionEnum, StatusTrasaction } from "src/enums/transaction.enum"
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
import { User } from '~/modules/auth/user/entities/user.entity';

@Entity('transactions')
export class Transactions extends TimesTampEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionEnum,
  })
  type: string;
  
  @ManyToOne(() => User, (user) => user.id)
  expeditor: number;

  @ManyToOne(() => User, (user) => user.id)
  recipient: number;

  @ManyToOne(() => User, (user) => user.id)
  final_executor: number

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
