import { Injectable } from '@nestjs/common';
import { CreateSubAgencyDto } from './dto/create-sub-agency.dto';
import { UpdateSubAgencyDto } from './dto/update-sub-agency.dto';

@Injectable()
export class SubAgencyService {
  create(createSubAgencyDto: CreateSubAgencyDto) {
    return 'This action adds a new subAgency';
  }

  findAll() {
    return `This action returns all subAgency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subAgency`;
  }

  update(id: number, updateSubAgencyDto: UpdateSubAgencyDto) {
    return `This action updates a #${id} subAgency`;
  }

  remove(id: number) {
    return `This action removes a #${id} subAgency`;
  }
}
