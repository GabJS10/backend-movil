import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createPlayerDto: CreatePlayerDto) {
    console.log(createPlayerDto);
    
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(Number(id));
  }

  @Get('stats/:id')
  @HttpCode(200)
  getPlayerAndStat(@Param('id') id: string) {
    return this.playersService.getPlayerAndStat(Number(id));
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() updatePlayerDto: UpdatePlayerDto) {
    console.log(id, updatePlayerDto);
    
    return this.playersService.update(id, updatePlayerDto);
  }


  //delete
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: number) {
    console.log(id,"eliminar");
    
    return this.playersService.deletePlayer(id);
  }
  
}
