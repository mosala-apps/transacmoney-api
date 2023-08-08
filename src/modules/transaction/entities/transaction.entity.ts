import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransactionEnum, StatusTrasaction } from 'src/enums/transaction.enum';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';
import { User } from '~/modules/auth/user/entities/user.entity';
import { Country } from '~/modules/country/entities/country.entity';
import { Currency } from '~/modules/currency/entities/currency.entity';

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

  @ManyToOne(() => Currency)
  currency: Currency;

  @Column()
  amountWithCommision: number;

  @ManyToOne(() => Country)
  countryFrom

  @ManyToOne(() => Country)
  countryTo
}
