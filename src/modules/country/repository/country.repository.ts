import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Country } from '../entities/country.entity';

@Injectable()
export class CountryRepository extends Repository<Country> {
  constructor(dataSource: DataSource) {
    super(Country, dataSource.createEntityManager());
  }
}
