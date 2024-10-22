import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubAgencyDto } from './dto/create-sub-agency.dto';
import { UpdateSubAgencyDto } from './dto/update-sub-agency.dto';
import { SubAgencyRepository } from './repository/sub-agency.repository';
import { SubAgency } from './entities/sub-agency.entity';
import { AccountRepository } from '../account/repository/account.repository';
import { generateAccountNumber } from '~/helpers';
import { DeepPartial } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { AgencyTypeEnum } from '~/enums/agency-type.enum';

@Injectable()
export class SubAgencyService {
  constructor(private readonly subAgencyRepo: SubAgencyRepository, private accountRepo: AccountRepository) {}
  async create(createSubAgencyDto: CreateSubAgencyDto): Promise<SubAgency> {
    try {
      const subAgency = await this.subAgencyRepo.save(
        {
          ...createSubAgencyDto, 
          type: AgencyTypeEnum.SUB_AGENCY
        });
      console.log(SubAgency)

      const newAccount: DeepPartial<Account> = {
        accountNumber: generateAccountNumber(), amount: 400,
        subAgency,
      }
      await this.accountRepo.save(newAccount)
      return subAgency;
    
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<SubAgency[]> {
    try {
      return await this.subAgencyRepo.find({
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

  async findOne(id: number): Promise<SubAgency> {
    try {
      return await this.subAgencyRepo.findOne({ where : {id: id}, 
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

  async update(id: number, updateSubAgencyDto: UpdateSubAgencyDto) {

    const existingSubAgency = await this.subAgencyRepo.findOne({ where: { id } });
  
    if (!existingSubAgency) {
      throw new NotFoundException(`La sous-agence avec l'ID ${id} n'existe pas.`);
    }
    return await this.subAgencyRepo.update(id, updateSubAgencyDto);
  }

  async remove(id: number) {

    const existingSubAgency = await this.subAgencyRepo.findOne({ where: { id } });
    if (!existingSubAgency) {
      throw new NotFoundException(`La sous-agence avec l'ID ${id} n'existe pas.`);
    }
    return this.subAgencyRepo.delete(id);
  }
}
