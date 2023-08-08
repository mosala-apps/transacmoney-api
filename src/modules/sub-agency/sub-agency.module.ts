import { Global, Module } from '@nestjs/common';
import { SubAgencyService } from './sub-agency.service';
import { SubAgencyController } from './sub-agency.controller';
import { SubAgencyRepository } from './repository/sub-agency.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from '../agency/entities/agency.entity';
import { AccountModule } from '../account/account.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Agency]), AccountModule],
  controllers: [SubAgencyController],
  providers: [SubAgencyService, SubAgencyRepository],
  exports: [SubAgencyService, SubAgencyRepository],
})
export class SubAgencyModule {}
