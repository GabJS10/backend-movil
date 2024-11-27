import { IsString, IsEmail } from "class-validator";
import {Transform} from "class-transformer";
export class LoginUserDto  {

    @IsEmail()
    email: string;


    @IsString()
    @Transform(({ value }) => value.trim())
    password: string;

}