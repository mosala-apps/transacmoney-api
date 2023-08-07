import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CurrencyRepository } from './repository/currency.repository';

@Injectable()
export class CurrencyService {
  constructor(private currencyRepo: CurrencyRepository) { }
  
  async create(createCurrencyDto: CreateCurrencyDto) {
    return await this.currencyRepo.save(createCurrencyDto)
  }

  async findAll() {
    console.log("fdlkjgfklgj")
    return await this.currencyRepo.find({
      select: {
        id: true,
        name: true,
        code: true
      }
    })
  }

  async findOne(id: number) {
    return await this.currencyRepo.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        code: true
      }
    })
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return await this.currencyRepo.update(id, updateCurrencyDto)
  }

  async remove(id: number) {
    return await this.currencyRepo.delete(id)
  }
}
