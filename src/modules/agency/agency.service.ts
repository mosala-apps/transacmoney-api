import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { AgencyRepository } from './repository/agency.repository';
import { Agency } from './entities/agency.entity';
import { AccountRepository } from '../account/repository/account.repository';
import { generateAccountNumber } from '~/helpers';
import { Account } from '../account/entities/account.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AgencyService {
  constructor(private readonly agencyRepo: AgencyRepository, private accountRepo: AccountRepository) {}
  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    try {
      const agency = await this.agencyRepo.save(createAgencyDto);

      const newAccount: DeepPartial<Account> = {
        accountNumber: generateAccountNumber(), amount: 400,
        agency,
      }
      await this.accountRepo.save(newAccount)
      return agency;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Agency[]> {
    try {
      return await this.agencyRepo.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Agency> {
    try {
      return await this.agencyRepo.findOneByOrFail({ id: id });
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
