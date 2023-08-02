import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UserService } from '../auth/user/user.service';
import { MailerService } from '../mailer/mailer.service';
import { TransactionEnum } from '~/enums/transaction.enum';
import { TransactionRepository } from './repository/transaction.repository';
import { NotFoundError } from 'rxjs';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private userService: UserService,
    private mailerService: MailerService,
  ) {}
  private verifData = async (transaction) => {
    const exp = await this.userService.findOne(transaction.expeditor);
    if (!exp)
      throw new NotFoundError(
        `L'expediteur ${transaction.expeditor} n'existe pas`,
      );

    const rec = await this.userService.findOne(transaction.recipient);
    if (!rec)
      throw new NotFoundError(
        `L'utilisateur ${transaction.recipient} n'existe pas`,
      );

    if (TransactionEnum[transaction.type])
      throw new NotFoundError(`le type ${transaction.type} n'est pas correcte`);
  };

  async create(transaction: CreateTransactionDto) {
    try {
      // identifier la personne
      /* identifie le role du user 

      si userRole === agency
        - recupere l'agence du user ( find(idUser))
        - update le compte de l'agence( id)=> executer la method updateAccount
      si userRole === sous-agency
        - recupere la sous-agence du user ( find(idUser))
        - update le compte de l'agence( id)=> executer la method updateAccount

      */
      await this.transactionRepository.updateAccountAmount(
        transaction.executorId,
        transaction.amount,
      );
      return await this.transactionRepository.save(transaction);
    } catch (error) {}
  }

  async userTransactions(id: number) {
    return await this.transactionRepository.userTransactions(id);
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
      },
    });
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
      },
    });
  }

  async update(id: number, updateTransaction: UpdateTransactionDto) {
    const transction = await this.findOne(id);
    if (!transction)
      throw new NotFoundError(`La transaction ${id} n'existe pas !`);

    await this.transactionRepository.update(id, updateTransaction);

    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.transactionRepository.delete(id);
  }
}
