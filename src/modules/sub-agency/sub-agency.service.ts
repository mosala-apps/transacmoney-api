import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubAgencyDto } from './dto/create-sub-agency.dto';
import { UpdateSubAgencyDto } from './dto/update-sub-agency.dto';
import { SubAgencyRepository } from './repository/sub-agency.repository';
import { SubAgency } from './entities/sub-agency.entity';

@Injectable()
export class SubAgencyService {
  constructor(private readonly subAgencyRepo: SubAgencyRepository) {}
  async create(createSubAgencyDto: CreateSubAgencyDto): Promise<SubAgency> {
    try {
      return await this.subAgencyRepo.save(createSubAgencyDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<SubAgency[]> {
    try {
      return await this.subAgencyRepo.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<SubAgency> {
    try {
      return await this.subAgencyRepo.findOneByOrFail({ id: id });
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
