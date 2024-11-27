import { IsString, IsEmail,IsNotEmpty } from "class-validator";
import {Transform} from "class-transformer";
export class CreateUserDto  {

    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    password: string;

}