import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get(":email")
  @HttpCode(200)
  findOne(@Param("email") email: string) {
    return this.usersService.getOneUser(email);
  }

  @Post("login")
  @HttpCode(200)
  login(@Body() loginUserDto: CreateUserDto) {
    console.log(loginUserDto);
    
    return this.usersService.login(loginUserDto);
  }

}
