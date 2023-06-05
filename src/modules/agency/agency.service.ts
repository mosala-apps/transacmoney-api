import { Injectable } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { AgencyRepository } from './repository/agency.repository';

@Injectable()
export class AgencyService {
  constructor(private readonly agencyRepo: AgencyRepository) {}
  create(createAgencyDto: CreateAgencyDto) {
    try {
      return this.agencyRepo.save(createAgencyDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all agency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agency`;
  }

  update(id: number, updateAgencyDto: UpdateAgencyDto) {
    return `This action updates a #${id} agency`;
  }

  remove(id: number) {
    return `This action removes a #${id} agency`;
  }
}
