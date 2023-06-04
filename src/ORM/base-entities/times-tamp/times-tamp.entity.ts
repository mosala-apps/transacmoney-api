import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
export class TimesTampEntity {
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date; // Last updated date

  @DeleteDateColumn()
  deletedAt: Date; // Deletion date
}
