import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '../prima.service';
@Injectable()
export class PlayersService {

  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto) {
    try {
      return await this.prisma.player.create({
        data: {
          ...createPlayerDto,
          id: await this.prisma.player.count() + 1,
          teamId: Number(createPlayerDto.teamId),
        }
      })
    } catch (error) {
      
      throw new HttpException(error.message, 400);
    }
  }

  async findAll() {
    return await this.prisma.player.findMany();
  }

  //delete
  async deletePlayer(id: number) {
    try {
      return await this.prisma.player.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      console.log(error);
      
      throw new HttpException(error.message, 400);
    }
  }

  async getPlayerAndStat(playerId: number) {
    try {
      
      const player = await this.prisma.player.findUnique({
        where: {
          id: Number(playerId),
        },
        include: {
          playerStats: {
            include: {
              match: {
                include: {
                  localTeam: true,
                  visitorTeam: true
                }
              }
            }
          },
          team: true
        }
      })

      //total goals

      

      if (!player) {
        throw new HttpException('Player not found', 404);
      }
      

      const totalGoalsAndAssists = player.playerStats.reduce((acc, stat) => {
        acc.goal += stat.goal;
        acc.assist += stat.assist;
        return acc;
      }, { goal: 0, assist: 0 })  
     
      player["totalGoalsAndAssists"] = totalGoalsAndAssists
      return player


    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findOne(id: number) {
    try {
      const player = await this.prisma.player.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!player) {
        throw new HttpException('Player not found', 404);
      }

      return player
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      const player = await this.prisma.player.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!player) {
        throw new HttpException('Player not found', 404);
      }

      return await this.prisma.player.update({
        where: {
          id: Number(id),
        },
        data: {
          ...updatePlayerDto,
          teamId: Number(player.teamId),
        }
      })

    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

 
}
