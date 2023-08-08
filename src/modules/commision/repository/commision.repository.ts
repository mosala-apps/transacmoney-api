import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Commision } from '../entities/commision.entity';

@Injectable()
export class CommisionRepository extends Repository<Commision> {
  constructor(dataSource: DataSource) {
    super(Commision, dataSource.createEntityManager());
  }
}
