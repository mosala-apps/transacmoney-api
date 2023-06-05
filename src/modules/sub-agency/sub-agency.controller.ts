import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubAgencyService } from './sub-agency.service';
import { CreateSubAgencyDto } from './dto/create-sub-agency.dto';
import { UpdateSubAgencyDto } from './dto/update-sub-agency.dto';

@Controller('subAgency')
export class SubAgencyController {
  constructor(private readonly subAgencyService: SubAgencyService) {}

  @Post('/store')
  create(@Body() createSubAgencyDto: CreateSubAgencyDto) {
    return this.subAgencyService.create(createSubAgencyDto);
  }

  @Get()
  findAll() {
    return this.subAgencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subAgencyService.findOne(+id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateSubAgencyDto: UpdateSubAgencyDto,
  ) {
    return this.subAgencyService.update(+id, updateSubAgencyDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.subAgencyService.remove(+id);
  }
}
