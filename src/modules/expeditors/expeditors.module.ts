import { Module } from '@nestjs/common';
import { ExpeditorsService } from './expeditors.service';
import { ExpeditorsController } from './expeditors.controller';

@Module({
  controllers: [ExpeditorsController],
  providers: [ExpeditorsService]
})
export class ExpeditorsModule {}
