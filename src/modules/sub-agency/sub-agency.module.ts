import { Module } from '@nestjs/common';
import { SubAgencyService } from './sub-agency.service';
import { SubAgencyController } from './sub-agency.controller';
import { SubAgencyRepository } from './repository/sub-agency.repository';

@Module({
  controllers: [SubAgencyController],
  providers: [SubAgencyService, SubAgencyRepository],
  exports: [SubAgencyService, SubAgencyRepository],
})
export class SubAgencyModule {}
