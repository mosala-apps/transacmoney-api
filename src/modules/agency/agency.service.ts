import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { AgencyRepository } from './repository/agency.repository';
import { Agency } from './entities/agency.entity';
import { AccountRepository } from '../account/repository/account.repository';
import { generateAccountNumber } from '~/helpers';
import { Account } from '../account/entities/account.entity';
import { DeepPartial } from 'typeorm';
import { UserCredentialsDto } from '../auth/user/dto/login-user.dto';
import { RegisterUserDto } from '../auth/user/dto/register-user.dto';
import { AgencyTypeEnum } from '~/enums/agency-type.enum';

@Injectable()
export class AgencyService {
  constructor(
    private readonly agencyRepo: AgencyRepository,
    private accountRepo: AccountRepository,
  ) { }
  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    try {
      const agency = await this.agencyRepo.save({
        ...createAgencyDto,
        type: AgencyTypeEnum.AGENCY,
      });

      const newAccount: DeepPartial<Account> = {
        accountNumber: generateAccountNumber(),
        amount: 400,
        agency,
      };
      await this.accountRepo.save(newAccount);
      return agency;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createSubAgency(user: RegisterUserDto): Promise<Agency> {
    try {
      const createAgencyDto: CreateAgencyDto = {
        email: user.email,
        name: user.username,
        phone: user.email,
        location: user.email,
        address: '',
      };
      const agency = await this.agencyRepo.save({
        ...createAgencyDto,
        type: AgencyTypeEnum.SUB_AGENCY,
      });

      const newAccount: DeepPartial<Account> = {
        accountNumber: generateAccountNumber(),
        amount: 400,
        agency,
      };
      await this.accountRepo.save(newAccount);
      return agency;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAll(): Promise<Agency[]> {
    try {
      return await this.agencyRepo.find({
        where: {
          type: 'agency',
        },
        relations: ['account'],
        loadEagerRelations: false,
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
          },
          responsible: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Agency> {
    try {
      return await this.agencyRepo.findOne({
        where: { id: id },
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
          },
        },
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
