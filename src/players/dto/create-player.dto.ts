/*
model Player {
  id       Int     @id @default(autoincrement())
  name     String
  age      Int     @db.Integer
  position String  @db.VarChar(255)
  number   String  @db.VarChar(255)
  image    String?

  teamId Int
  team   Team @relation("PlayersOfTheTeam", fields: [teamId], references: [id])

  playerStats Stats[] @relation("StatsOfThePlayer")

  @@map("players")
}
*/


import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsString()
    @IsNotEmpty()
    number: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsNotEmpty()
    teamId: string;

}