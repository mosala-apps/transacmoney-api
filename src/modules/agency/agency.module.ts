import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { AgencyRepository } from './repository/agency.repository';

@Module({
  controllers: [AgencyController],
  providers: [AgencyService, AgencyRepository],
  exports: [AgencyRepository, AgencyService],
})
export class AgencyModule {}
