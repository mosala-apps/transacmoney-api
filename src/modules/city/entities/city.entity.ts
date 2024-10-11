import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '~/modules/country/entities/country.entity';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';

@Entity('cities')
export class City extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(() => Country, (country: Country) => country.cities)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
