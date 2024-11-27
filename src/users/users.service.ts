import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {LoginUserDto} from "./dto/login-user.dto";
import {PrismaService} from "../prima.service";
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}



    async create(createUserDto: CreateUserDto) {
        try {
            const user = await this.prisma.user.create({
                data: createUserDto,
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });
            return user
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }


    async getOneUser(email: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email
                },
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });

            if (!user) {
                throw new HttpException('User not found', 404);
            }

            return user
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }   


    async login(loginUserDto: LoginUserDto) {
        console.log(loginUserDto);
        
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: loginUserDto.email
                },
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });
            if (!user) {
                throw new HttpException('User not found', 404);
            }

            if (user.password !== loginUserDto.password) {
                throw new HttpException('Invalid password', 401);
            }

            return user
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }   

}
