import { PartialType } from '@nestjs/swagger';
import { CreateExpeditorDto } from './create-expeditor.dto';

export class UpdateExpeditorDto extends PartialType(CreateExpeditorDto) {}
