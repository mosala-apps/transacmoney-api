import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { User } from '../auth/user/entities/user.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/actions';
import { Transactions } from './entities/transaction.entity';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService, private caslAbilityFactory: CaslAbilityFactory) {}

  @Post()
  create(@CurrentUser() currentUser: User, @Body() createTransactionDto: CreateTransactionDto) {
    try {
      const ability = this.caslAbilityFactory.createForUser(currentUser)
      if (!ability.can(Action.Create, Transactions)){
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à effectuer cette action !",
        );
      }
      
      return this.transactionService.create(createTransactionDto);
    } catch (error) {
      
    }
  }

  @Get('/user/:id')
  userTransactions(@CurrentUser() currentUser: User, @Param('id') id: number) {
    try {
      const ability = this.caslAbilityFactory.createForUser(currentUser)
      if (!ability.can(Action.Read, Transactions)){
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à effectuer cette action !",
        );
      }
    
      return this.transactionService.userTransactions(id);
    } catch (error) {
      
    }
  }

  @Get()
  findAll(@CurrentUser() currentUser: User) {
    try {
      const ability = this.caslAbilityFactory.createForUser(currentUser)
      if (!ability.can(Action.Read, Transactions)){
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à effectuer cette action !",
        );
      }
    
    return this.transactionService.findAll();
    } catch (error) {
      
    }
  }

  @Get(':id')
  findOne(
    @CurrentUser() currentUser: User, @Param('id') id: string) {
    try {
      const ability = this.caslAbilityFactory.createForUser(currentUser)
      if (!ability.can(Action.Read, Transactions)){
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à effectuer cette action !",
        );
      }
       
    
    return this.transactionService.findOne(+id);
    } catch (error) {
      
    }
  }

  @Patch(':id')
  update(
    @CurrentUser() currentUser: User,
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    try {
      const ability = this.caslAbilityFactory.createForUser(currentUser)
      if (!ability.can(Action.Update, Transactions)){
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à effectuer cette action !",
        );
      }
       
    return this.transactionService.update(+id, updateTransactionDto);
    } catch (error) {
      
    }
  }

  @Delete(':id')
  remove(@CurrentUser() currentUser: User, @Param('id') id: string) {
    try {
      const ability = this.caslAbilityFactory.createForUser(currentUser)
      if (!ability.can(Action.Manage, Transactions)){
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à effectuer cette action !",
        );
      }
       
      
      return this.transactionService.remove(+id);
    } catch (error) {
      
    }
  }

  @Get("statistics_final_executor")
  statisticsFinalExecutor(@CurrentUser() currentUser: User, @Body("currencyId")currencyId: string, @Body("dateBegin") dateBegin: Date, @Body("dateEnd") dateEnd ): any {
    return this.transactionService.statistiqueFinalExecutor(currentUser, currencyId, dateBegin, dateEnd);
  }







  /** Stats for super admin */
  
  // stats simple user
  @Get("allStatistics_final_executor")
  allStatistiqueInterventionUser(@CurrentUser() currentUser: User, @Body('executors') executors: string[], @Body("currencyId") currencyId: string, @Body("dateBegin") dateBegin: Date, @Body("dateEnd") dateEnd): any{
    try {
      const ability = this.caslAbilityFactory.createForUser(currentUser)
      if (!ability.can(Action.Manage, Transactions)){
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à effectuer cette action !",
        );
      }
      
      return this.transactionService.allStatistiqueInterventionUser(executors, currencyId, dateBegin, dateEnd)
    } catch (error) {
      
    }
  }

  // stats agency and sub agencies
  @Get("allStatistics_final_executor")
  allStatistiqueIntervention(@CurrentUser() currentUser: User, @Body('finalExecutors') finalExecutors: string[], @Body("currencyId") currencyId: string, @Body("dateBegin") dateBegin: Date, @Body("dateEnd") dateEnd): any{
    try {
      const ability = this.caslAbilityFactory.createForUser(currentUser)
      if (!ability.can(Action.Manage, Transactions)){
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à effectuer cette action !",
        );
      }
       
      return this.transactionService.allStatistiqueIntervention(finalExecutors, currencyId, dateBegin, dateEnd)
    } catch (error) {
      
    }
  }

  @Get("allStatistics_final_executor")
  allStatisticsFinalExecutor(@CurrentUser() currentUser: User, @Body('finalExecutors') finalExecutors: string[], @Body("currencyId") currencyId: string, @Body("dateBegin") dateBegin: Date, @Body("dateEnd") dateEnd): any{
    try {
      const ability = this.caslAbilityFactory.createForUser(currentUser)
      if (!ability.can(Action.Manage, Transactions)){
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à effectuer cette action !",
        );
      }
      
    return this.transactionService.allStatistiqueFinalExecutor(finalExecutors, currencyId, dateBegin, dateEnd);
    } catch (error) {
      
    }
  }
}
