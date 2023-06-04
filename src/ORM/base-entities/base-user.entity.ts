import { Column } from 'typeorm';
export default class BaseUserEntity {
  @Column()
  name: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
