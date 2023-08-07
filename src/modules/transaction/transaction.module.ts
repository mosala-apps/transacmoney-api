import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UserService } from '../auth/user/user.service';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { UserRepository } from '../auth/user/repository/user.repositoy';
import { TransactionRepository } from './repository/transaction.repository';
import { AccountService } from '../account/account.service';
import { AccountModule } from '../account/account.module';
import { CommisionModule } from '../commision/commision.module';
import { CommisionService } from '../commision/commision.service';
import { CommisionRepository } from '../commision/repository/commision.repository';

@Module({
  imports: [AccountModule, CommisionModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    UserService,
    UserRepository,
    JwtStrategy,
    TransactionRepository,
    CommisionRepository,
    CommisionService
  ],
})
export class TransactionModule {}
