import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';

export class BaseAgencyEntity extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  location: string;
}
