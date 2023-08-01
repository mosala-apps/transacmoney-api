import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UserService } from '../auth/user/user.service';
import { MailerService } from '../mailer/mailer.service';
import { StatusTrasaction, TransactionEnum } from '~/enums/transaction.enum';
import { TransactionRepository } from './repository/transaction.repository';
import { NotFoundError } from 'rxjs';
import { AccountService } from '../account/account.service';
import { User } from '../auth/user/entities/user.entity';
import { EnumActionOnAmount } from '~/helpers';

@Injectable()
export class TransactionService {

  private verifData = async (transaction) => {
    const exp = await this.userService.findOne(transaction.expeditor);
    if (!exp) throw new NotFoundError(`L'expediteur ${transaction.expeditor} n'existe pas`)
    
    const rec = await this.userService.findOne(transaction.recipient);
    if (!rec) throw new NotFoundError(`L'utilisateur ${transaction.recipient} n'existe pas`)
    
    if (TransactionEnum[transaction.type]) throw new NotFoundError(`le type ${transaction.type} n'est pas correcte`)
  }
  constructor(private transactionRepository: TransactionRepository, private userService: UserService, private mailerService: MailerService) { }
  
  async create_subAgency(amount: number, user: User, action: EnumActionOnAmount) {
      await this.transactionRepository[`${action}AccountAmount`](amount, {subAgency: user.subAgency.id})
  }

  async create_agency(amount: number, user: User, action: EnumActionOnAmount) {
      await this.transactionRepository[`${action}AccountAmount`](amount, {agency: user.agency.id})
  }
  
  async depositAction(transaction : CreateTransactionDto) {
    try {
      // retrieve amount on expeditor
      const user = await this.userService.findOne(transaction.expeditor);
      await this[`create_${user.role}`](transaction, user, "retrieve");
      
      // add amount on recipient account
      const userRec = await this.userService.findOne(transaction.expeditor);
      await this[`create_${userRec.role}`](transaction, userRec, "add");

      return await this.transactionRepository.save({...transaction, status: StatusTrasaction.ACCEPTED})
    } catch (error) {
      throw new Error(error)
    }
  }

  async withdrawalAction(transaction: CreateTransactionDto) {
    try {
      // enlever l'argent du compte de l'executant 
      const userExe = await this.userService.findOne(transaction.executor);
      await this[`create_${userExe.role}`](transaction, userExe, "retrieve");

      // mettre l'argent dans le compte de l'agence qui donne l'argent
      const user = await this.userService.findOne(transaction.final_executor);
      await this[`create_${user.role}`](transaction, user, "add");
      return await this.transactionRepository.save(transaction)
    } catch (error) {
      
    }
  }

  async transfer_toAction(transaction: CreateTransactionDto) {
    try {
      // ajouter de l'argent dans le compte de l'executant
      const user = await this.userService.findOne(transaction.executor);
      await this[`create_${user.role}`](transaction, user, "add");
      return await this.transactionRepository.save(transaction)
    } catch (error) {
      
    }
  }

  async create(transaction: CreateTransactionDto) {

    try {
      this[`${transaction.type.toLowerCase()}Action`](transaction)
    } catch (error) { 
    }
  }

async userTransactions(id: number) {
  return await this.transactionRepository.userTransactions(id)
}

  async findAll() {
    return await this.transactionRepository.find({
      select: {
        id: true,
        updatedAt: true,
        status: true,
        type: true,
        final_executor: true,
        expeditor: true,
        recipient: true,
        executor: true
      }
    })
  }

  async findOne(id: number) {
    return await this.transactionRepository.findOne({
      where: {id},
      select: {
        id: true,
        updatedAt: true,
        status: true,
        type: true,
        expeditor: true,
        recipient: true,
        executor: true
      }
    })
  }

  async update(id: number, updateTransaction: UpdateTransactionDto) {
    const transction = await this.findOne(id)
    if (!transction) throw new NotFoundError(`La transaction ${id} n'existe pas !`)

    await this.transactionRepository.update(id, updateTransaction);

    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.transactionRepository.delete(id)
  }
}
