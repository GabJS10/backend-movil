import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prima.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
@Injectable()
export class TeamsService {
    constructor(private prisma: PrismaService) {}



    async createTeam(createTeamDto: CreateTeamDto) {
        try {
            return this.prisma.team.create({
                data: {
                    ...createTeamDto,
                    userId: Number(createTeamDto.userId),
                },
            });
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }


    async updateTeam(id: number, updateTeamDto: UpdateTeamDto) {
        try {
            
            const team = await this.prisma.team.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!team) {
                throw new HttpException('Team not found', 404);
            }


            return this.prisma.team.update({
                where: {
                    id: Number(id),
                },
                data: {
                    ...updateTeamDto,
                    userId: team.userId,
                },
            });

        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    async getTeams() {
        try {
            return this.prisma.team.findMany();
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }


    async getTeamWithPlayers(id: number) {
        try {
            const team = await this.prisma.team.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    players: true,
                },
            });


            if (!team) {
                throw new HttpException('Team not found', 404);
            }
            
            return team
            
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    async getOneTeam(id: number) {
        try {
            const team = await this.prisma.team.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!team) {
                throw new HttpException('Team not found', 404);
            }
            

            return team
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }   


    //delete
    async deleteTeam(id: number) {
        try {
            return this.prisma.team.delete({
                where: {
                    id: Number(id),
                },
            });
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

}
