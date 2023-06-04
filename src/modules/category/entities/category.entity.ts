import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';

@Entity('categories')
export class Category extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: number;

}
