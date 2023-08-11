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
        agency
      } 
      await this.accountRepo.save(newAccount)
      return agency;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Agency[]> {
    try {
      return await this.agencyRepo.find({
        relations: ['account'],
        select: {
          createAt: true,
          updatedAt: true,
          id: true,
          name: true,
          email: true,
          phone: true,
          location: true,
          account: {
            id: true,
            amount: true,
            accountNumber: true,
          }
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Agency> {
    try {
      return await this.agencyRepo.findOne({ where: { id: id }, 
        relations: ['account'],
        select: {
          createAt: true,
          updatedAt: true,
          id: true,
          name: true,
          email: true,
          phone: true,
          location: true,
          account: {
            id: true,
            amount: true,
            accountNumber: true,
          }
        }
       });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: number, updateAgencyDto: UpdateAgencyDto) {
    return await this.agencyRepo.update(id, updateAgencyDto);
  }

  async remove(id: number) {
    return await this.agencyRepo.delete(id);
  }
}
