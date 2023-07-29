import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpeditorsService } from './expeditors.service';
import { CreateExpeditorDto } from './dto/create-expeditor.dto';
import { UpdateExpeditorDto } from './dto/update-expeditor.dto';

@Controller('expeditors')
export class ExpeditorsController {
  constructor(private readonly expeditorsService: ExpeditorsService) {}

  @Post()
  create(@Body() createExpeditorDto: CreateExpeditorDto) {
    return this.expeditorsService.create(createExpeditorDto);
  }

  @Get()
  findAll() {
    return this.expeditorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expeditorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpeditorDto: UpdateExpeditorDto) {
    return this.expeditorsService.update(+id, updateExpeditorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expeditorsService.remove(+id);
  }
}
