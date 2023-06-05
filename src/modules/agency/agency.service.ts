import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      return this.agencyRepo.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    try {
      return this.agencyRepo.findOneByOrFail({ id: id });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  update(id: number, updateAgencyDto: UpdateAgencyDto) {
    return `This action updates a #${id} agency`;
  }

  remove(id: number) {
    return `This action removes a #${id} agency`;
  }
}
