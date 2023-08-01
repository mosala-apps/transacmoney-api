import { Global, Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { AgencyRepository } from './repository/agency.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './entities/agency.entity';
import { AccountModule } from '../account/account.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Agency]), AccountModule],
  controllers: [AgencyController],
  providers: [AgencyService, AgencyRepository],
  exports: [AgencyRepository, AgencyService],
})
export class AgencyModule {}
