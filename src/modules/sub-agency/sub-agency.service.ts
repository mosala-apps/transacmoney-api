import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubAgencyDto } from './dto/create-sub-agency.dto';
import { UpdateSubAgencyDto } from './dto/update-sub-agency.dto';
import { SubAgencyRepository } from './repository/sub-agency.repository';

@Injectable()
export class SubAgencyService {
  constructor(private readonly subAgencyRepo: SubAgencyRepository) {}
  create(createSubAgencyDto: CreateSubAgencyDto) {
    try {
      return this.subAgencyRepo.save(createSubAgencyDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    try {
      return this.subAgencyRepo.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    try {
      return this.subAgencyRepo.findOneByOrFail({ id: id });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  update(id: number, updateSubAgencyDto: UpdateSubAgencyDto) {
    return `This action updates a #${id} subAgency`;
  }

  remove(id: number) {
    return `This action removes a #${id} subAgency`;
  }
}
