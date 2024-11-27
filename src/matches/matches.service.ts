import { HttpException, Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from '../prima.service';
@Injectable()
export class MatchesService {

  constructor(private prisma: PrismaService) {}

  async create(createMatchDto: CreateMatchDto) {
    try {
      return await this.prisma.match.create({
        data: {
          ...createMatchDto,
          localTeamId: Number(createMatchDto.localTeamId),
          visitorTeamId: Number(createMatchDto.visitorTeamId),
        }
      });
      
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findAll() {
    return await this.prisma.match.findMany();
  }

  async getMatchPerTeam(teamId: number) {
    try {
      return await this.prisma.match.findMany({
        where: {
          OR: [
            {
              localTeamId: Number(teamId),
            },
            {
              visitorTeamId: Number(teamId),
            },
          ],
        },
        include: {
          localTeam: {
            select: {
              name: true,
              image: true
            }
          },
          visitorTeam: {
            select: {
              name: true,
              image: true
            }
          }
        }
      });

      
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getMatchAndPlayersAndStats(matchId: number) {
    try {

      const match = await this.prisma.match.findUnique({
        where: {
          id: Number(matchId),
        },
        include: {
          localTeam: {
            include: {
              players: {
                include: {
                  playerStats: {
                    where: {
                      matchId: Number(matchId)
                    }
                  }
                }
                 
              }
            }
          },
          visitorTeam: {
            include: {
              players: {
                include: {
                  playerStats: {
                    where: {
                      matchId: Number(matchId)
                    }
                  }
                }
              }
            } 
    }}});

      if (!match) {
        throw new HttpException('Match not found', 404);
      }

      return match


    } catch (error) {
      throw new HttpException(error.message, 400);
    }
}

  async findOne(id: number) {
    try {
      const match = await this.prisma.match.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!match) {
        throw new HttpException('Match not found', 404);
      }

      return match

    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    try {

      const match = await this.prisma.match.findUnique({
        where: {
          id: Number(id),
        },
      });


      if (!match) {
        throw new HttpException('Match not found', 404);
      }

      return await this.prisma.match.update({
        where: {
          id: Number(id),
        },
        data: {
          ...updateMatchDto,
          localTeamId: Number(match.localTeamId),
          visitorTeamId: Number(match.visitorTeamId),
        },
      });

    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

}
