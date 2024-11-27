import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @HttpCode(200)
  getTeams() {
    return this.teamsService.getTeams();
  }


  @Get('with-players/:id')
  @HttpCode(200)
  getTeamWithPlayers(@Param('id') id: number) {
    console.log(id);
    
    return this.teamsService.getTeamWithPlayers(id);
  }

  @Get(':id')
  @HttpCode(200)
  getOneTeam(@Param('id') id: number) {
    return this.teamsService.getOneTeam(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createTeamDto: CreateTeamDto) {
    console.log(createTeamDto);
    
    return this.teamsService.createTeam(createTeamDto);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() updateTeamDto: UpdateTeamDto) {
    console.log(updateTeamDto);
    
    return this.teamsService.updateTeam(id, updateTeamDto);
  }


  //delete
  @HttpCode(200)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.teamsService.deleteTeam(id);
  }
}
