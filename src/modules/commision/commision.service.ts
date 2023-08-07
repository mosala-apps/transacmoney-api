import { Injectable, NotFoundException } from '@nestjs/common';
import { CommisionRepository } from './repository/commision.repository';
import { Commision } from './entities/commision.entity';
import { UpdateCommisionDto } from './dto/update-commision.dto';
import { CommisionInfoDto } from './dto/commsion-info.dto';

@Injectable()
export class CommisionService {
  constructor(
    private readonly commisionRepository: CommisionRepository,
  ) { this.initializeData()}

  async findAll(): Promise<Commision[]> {
    return this.commisionRepository.find();
  }

  async findOne(id: number): Promise<Commision> {
    const commision = await this.commisionRepository.findOne({ where: {id} });
    if (!commision) {
      throw new NotFoundException(`Commision with id: '${id}' not found.`);
    }
    return commision;
  }

  async update(id: number, update: UpdateCommisionDto) {
    return await this.commisionRepository.update(id, update);
  }

  async initializeData(): Promise<void> {
    const count = await this.commisionRepository.count();
    if (count === 0) {
      const commision1 = this.commisionRepository.create({
        name: 'Internationale',
        code: 'INT',
        value: 4
      });
      const commision2 = this.commisionRepository.create({
        name: 'Locale',
        code: 'LOC',
        value: 2
      });
      await this.commisionRepository.save([commision1, commision2]);
    }
  }

  async calculCommsion(amount: number, codeCommision: CommisionInfoDto) {
    const { code } = codeCommision;
    const commision = await this.commisionRepository.findOne({
      where: {
      code
      }
    }) 

    if (!commision) {
      throw new NotFoundException(`Commision with code: '${code}' not found.`);
    }
    
    const result = amount + (amount * commision.value / 100);
    
    return result;
  }
}
