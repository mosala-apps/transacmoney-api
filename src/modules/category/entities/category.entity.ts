import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Topic } from '../../forum/topic/entities/topic.entity';
import { TimesTampEntity } from '~/ORM/base-entities/times-tamp/times-tamp.entity';

@Entity('categories')
export class Category extends TimesTampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: number;

  @OneToMany(() => Topic, (topic) => topic.category)
  topics: Array<Topic>;
}
