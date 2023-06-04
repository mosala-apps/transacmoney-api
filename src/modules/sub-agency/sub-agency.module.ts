import { Module } from '@nestjs/common';
import { SubAgencyService } from './sub-agency.service';
import { SubAgencyController } from './sub-agency.controller';

@Module({
  controllers: [SubAgencyController],
  providers: [SubAgencyService]
})
export class SubAgencyModule {}
