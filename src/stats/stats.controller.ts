import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createStatDto: CreateStatDto) {
    return this.statsService.create(createStatDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.statsService.findAll();
  }

  @Get('get-one/:id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {

    return this.statsService.findOne(+id);
  }

   @Get('top-scorers')
  @HttpCode(200)
  getTopScorers() {
    return this.statsService.getTopScorers();
  }

  @Patch(':id')
  @HttpCode(200)
  
  update(@Param('id') id: string, @Body() updateStatDto: UpdateStatDto) {
    return this.statsService.update(+id, updateStatDto);
  }

  
  
}
