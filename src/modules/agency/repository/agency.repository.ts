import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Agency } from '../entities/agency.entity';

@Injectable()
export class AgencyRepository extends Repository<Agency> {
  constructor(dataSource: DataSource) {
    super(Agency, dataSource.createEntityManager());
  }

}
