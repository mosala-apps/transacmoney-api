import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { City } from '~/modules/city/entities/city.entity';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';

@Entity('countries')
export class Country extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => City, (city: City) => city.country)
  cities: City[];
}
