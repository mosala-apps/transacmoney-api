import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './repository/account.repository';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountRepository, AccountService],
})
export class AccountModule {}
