import { Module } from '@nestjs/common';
import { RecipientsService } from './recipients.service';
import { RecipientsController } from './recipients.controller';

@Module({
  controllers: [RecipientsController],
  providers: [RecipientsService]
})
export class RecipientsModule {}
