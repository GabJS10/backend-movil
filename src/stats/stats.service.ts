import { HttpException, Injectable } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { PrismaService } from '../prima.service';
@Injectable()
export class StatsService {

  constructor(private prisma: PrismaService) {}

  async create(createStatDto: CreateStatDto) {
   try{
      return await this.prisma.stats.create({data: createStatDto});

   } catch (error) {
      throw new HttpException(error.message, 400); 
   }
  }

  async findAll() {
    return await this.prisma.stats.findMany();
  }

  async getTopScorers() {
    const stats = await this.prisma.stats.groupBy({
      by: ['playerId'],
      _sum: {
        goal: true,
        assist: true
      },
      orderBy: {
        _sum: {
          goal: 'desc'
        }
      },
      take: 15
    })

    const players = await this.prisma.player.findMany({
      where: {
        id: {
          in: stats.map(stat => stat.playerId)
        }
      },
      include: {
        team: true
      }
    })

    
    const playerMap = players.reduce((acc, player) => {
      acc[player.id] = player;
      return acc;
    }, {});

    stats.forEach(stat => {
      stat['player'] = playerMap[stat.playerId];
    })      

    return stats
  }


  async findOne(id: number) {
    try {
      const stat = await this.prisma.stats.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!stat) {
        throw new HttpException('Stat not found', 404);
      }

      return stat;

    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: number, updateStatDto: UpdateStatDto) {
    try {

      const stat = await this.prisma.stats.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!stat) {
        throw new HttpException('Stat not found', 404);
      }


      return await this.prisma.stats.update({
        where: {
          id: Number(id),
        },
        data: {
          ...updateStatDto,
          matchId: stat.matchId,
          playerId: stat.playerId ,
        },
      });
      
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

}
