import { Injectable } from '@nestjs/common';
import { SubAgency } from '../entities/sub-agency.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class SubAgencyRepository extends Repository<SubAgency> {
  constructor(dataSource: DataSource) {
    super(SubAgency, dataSource.createEntityManager());
  }
}
