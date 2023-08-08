import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { CommisionService } from './commision.service';
import { UpdateCommisionDto } from './dto/update-commision.dto';
import { CommisionInfoDto } from './dto/commsion-info.dto';

@Controller('commision')
export class CommisionController {
  constructor(private readonly commisionService: CommisionService) {}

  @Get()
  findAll() {
    return this.commisionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commisionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body('commision') updateCommisionDto: UpdateCommisionDto,
  ) {
    return this.commisionService.update(+id, updateCommisionDto);
  }

  @Get('/resume')
  resume(@Body('amount') amount: number, @Body('code') code: CommisionInfoDto) {
    return this.commisionService.calculCommsion(amount, code);
  }
}
