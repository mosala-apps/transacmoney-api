import { Injectable } from '@nestjs/common';
import { CreateExpeditorDto } from './dto/create-expeditor.dto';
import { UpdateExpeditorDto } from './dto/update-expeditor.dto';

@Injectable()
export class ExpeditorsService {
  create(createExpeditorDto: CreateExpeditorDto) {
    return 'This action adds a new expeditor';
  }

  findAll() {
    return `This action returns all expeditors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expeditor`;
  }

  update(id: number, updateExpeditorDto: UpdateExpeditorDto) {
    return `This action updates a #${id} expeditor`;
  }

  remove(id: number) {
    return `This action removes a #${id} expeditor`;
  }
}
