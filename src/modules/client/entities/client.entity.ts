import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import BaseUserEntity from '~/ORM/base-entities/base-user.entity';

@Entity('clients')
export class Client extends BaseUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

}
