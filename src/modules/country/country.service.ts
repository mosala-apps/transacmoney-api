import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryRepository } from './repository/country.repository';

@Injectable()
export class CountryService {
  constructor(private countryRepo: CountryRepository) { }
  
  async create(createCountryDto: CreateCountryDto) {
    return await this.countryRepo.save(createCountryDto)
  }

  async findAll() {
    return await this.countryRepo.find({
      select: {
        id: true, 
        name: true,
        code: true
      }
    })
  }

  async findOne(id: number) {
    return await this.countryRepo.findOne({
      where: {id},
      select: {
        id: true, 
        name: true,
        code: true
      }
    })
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    return await this.countryRepo.update(id, updateCountryDto);
  }

  async remove(id: number) {
    return await this.countryRepo.delete(id)
  }
}
