import { Module } from '@nestjs/common';
import { CommisionService } from './commision.service';
import { CommisionController } from './commision.controller';
import { CommisionRepository } from './repository/commision.repository';

@Module({
  controllers: [CommisionController],
  providers: [CommisionService, CommisionRepository]
})
export class CommisionModule {}
