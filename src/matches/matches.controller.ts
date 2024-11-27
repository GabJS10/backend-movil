import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.matchesService.findAll();
  }

  @Get('match-details/:id')
  @HttpCode(200)
  getMatchAndPlayersAndStats(@Param('id') id: number) {
    return this.matchesService.getMatchAndPlayersAndStats(+id);
  }


  @Get('team-matches/:id')
  @HttpCode(200)
  getMatchPerTeam(@Param('id') id: number) {
    return this.matchesService.getMatchPerTeam(+id);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(+id, updateMatchDto);
  }


}
