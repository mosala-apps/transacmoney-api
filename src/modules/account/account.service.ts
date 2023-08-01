import { AccountRepository } from './repository/account.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepo: AccountRepository) {}
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    try {
      return await this.accountRepo.save(createAccountDto);
    } catch (error) {}
  }

  async findAll(): Promise<Account[]> {
    try {
      return await this.accountRepo.find();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateAmount(id: number, amount: number) {
    await this.accountRepo.updateAmount(id, amount)
  }

  async findOne(id: number): Promise<Account> {
    try {
      return await this.accountRepo.findOneByOrFail({ id: id });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
