import { PartialType } from '@nestjs/swagger';
import { CreateSubAgencyDto } from './create-sub-agency.dto';

export class UpdateSubAgencyDto extends PartialType(CreateSubAgencyDto) {}
