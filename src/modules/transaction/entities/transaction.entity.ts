import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransactionEnum, StatusTrasaction } from 'src/enums/transaction.enum';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
import { User } from '~/modules/auth/user/entities/user.entity';

@Entity('transactions')
export class Transactions extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionEnum,
  })
  type: string;

  @ManyToOne(() => User)
  expeditor: User;

  @ManyToOne(() => User)
  recipient: User;

  @ManyToOne(() => User, (user) => user.id)
  final_executor: number

  @Column()
  amount: number;

  @ManyToOne(() => User)
  executor: User;

  @ManyToOne(() => User)
  finalExecutor?: User;

  @Column({
    type: 'enum',
    enum: StatusTrasaction,
    default: StatusTrasaction.IN_PROGRESS,
  })
  status: string;
}
