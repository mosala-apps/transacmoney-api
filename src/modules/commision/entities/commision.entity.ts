import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';

@Entity('commisions')
export class Commision extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  value: number;
}
