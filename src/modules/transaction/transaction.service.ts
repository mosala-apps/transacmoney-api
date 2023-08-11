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
import { CommisionService } from '../commision/commision.service';

interface countriesCodes {
  to: string;
  from: string;
}


@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private userService: UserService,
    private mailerService: MailerService,
    private commisionService: CommisionService
  ) {}
  private verifData = async (transaction) => {
    const exp = await this.userService.findOne(transaction.expeditor);
    if (!exp)
      throw new NotFoundError(
        `L'expediteur ${transaction.expeditor} n'existe pas`,
      );

    const rec = await this.userService.findOne(transaction.recipient);
    if (!rec) throw new NotFoundError(`L'utilisateur ${transaction.recipient} n'existe pas`)
    
    if (TransactionEnum[transaction.type]) throw new NotFoundError(`le type ${transaction.type} n'est pas correcte`)
  }
  
  async create_subAgency(amount: number, user: User, action: EnumActionOnAmount) {
      await this.transactionRepository[`${action}AccountAmount`](amount, {subAgency: user.subAgency.id})
  }

  async create_agency(amount: number, user: User, action: EnumActionOnAmount) {
      await this.transactionRepository[`${action}AccountAmount`](amount, {agency: user.agency.id})
  }
  
  async depositAction(transaction : CreateTransactionDto) {
    try {
      // retrieve amount on expeditor
      const user = await this.userService.findOne(transaction.executorId);
      await this[`create_${user.role}`](transaction.amount, user, "retrieve");
      
      // add amount on recipient account
      const userRec = await this.userService.findOne(transaction.executorId);
      await this[`create_${userRec.role}`](transaction.amount, userRec, "add");

      return await this.transactionRepository.save({...transaction, status: StatusTrasaction.ACCEPTED})
    } catch (error) {
      throw new Error(error)
    }
  }

  async withdrawalAction(transaction: UpdateTransactionDto) {
    try {
      // enlever l'argent du compte de l'executant 
      const userExe = await this.userService.findOne(transaction.executorId);
      await this[`create_${userExe.role}`](transaction.amountWithCommision, userExe, "retrieve");

      // mettre l'argent dans le compte de l'agence qui donne l'argent
      const user = await this.userService.findOne(transaction.finalExecutorId);
      await this[`create_${user.role}`](transaction.amountWithCommision, user, "add");
      return await this.transactionRepository.save(transaction)
    } catch (error) {
      
    }
  }

  async transfer_toAction(transaction: CreateTransactionDto) {
    try {
      // ajouter de l'argent dans le compte de l'executant
      const user = await this.userService.findOne(transaction.executorId);

      if (transaction.countryFrom !== transaction.countryTo){
        transaction.amountWithCommision = await this.commisionService.calculCommsion(transaction.amount, {code: "INT"});
      } else {
        transaction.amountWithCommision = await this.commisionService.calculCommsion(transaction.amount, {code: "LOC"});
      }
      await this[`create_${user.role}`](transaction.amountWithCommision, user, "add");
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
        expeditor: {
          id: true,
          email: true,
          role: true,
        },
        recipient: {
          id: true,
          email: true,
          role: true,
        },
        executor: {
          id: true,
          email: true,
          role: true,
          agency: {
            id: true,
            name: true,
          },
          subAgency: {
            id: true,
            name: true,
          },
        },
        finalExecutor: {
          agency: {
            id: true,
            name: true,
          },
          subAgency: {
            id: true,
            name: true,
          },
        },
        countryFrom: {
          id: true,
          name: true,
          code: true 
        },
        countryTo: {
          id: true,
          name: true,
          code: true 
        },
        currency: {
          id: true,
          code: true,
          name: true
        },
        amountWithCommision: true
      }
    })
  }

  async findOne(id: number) {
    return await this.transactionRepository.findOne({
      where: { id },
      select: {
        id: true,
        updatedAt: true,
        status: true,
        type: true,
        expeditor: {
          id: true,
          email: true,
          role: true,
        },
        recipient: {
          id: true,
          email: true,
          role: true,
        },
        executor: {
          id: true,
          email: true,
          role: true,
          agency: {
            id: true,
            name: true,
          },
          subAgency: {
            id: true,
            name: true,
          },
        },
        finalExecutor: {
          agency: {
            id: true,
            name: true,
          },
          subAgency: {
            id: true,
            name: true,
          },
        },
        countryFrom: {
          id: true,
          name: true,
          code: true 
        },
        countryTo: {
          id: true,
          name: true,
          code: true 
        },
        currency: {
          id: true,
          code: true,
          name: true
        },
        amountWithCommision: true
      },
    });
  }

  async update(id: number, updateTransaction: UpdateTransactionDto) {
    const transction = await this.findOne(id);
    if (!transction)
      throw new NotFoundError(`La transaction ${id} n'existe pas !`);

    try {
      this[`${updateTransaction.type.toLowerCase()}Action`](updateTransaction)
    } catch (error) { 
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.transactionRepository.delete(id);
  }
}
