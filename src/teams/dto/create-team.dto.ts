import { IsString,IsDateString,IsNotEmpty,IsOptional } from "class-validator";


export class CreateTeamDto {


    @IsString()
    @IsNotEmpty()
    userId: string

    @IsString()
    @IsNotEmpty()
    name: string


    @IsString()
    @IsNotEmpty()
    coach: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsDateString()
    @IsNotEmpty()
    found: string


    @IsString()
    @IsOptional()
    image: string





}