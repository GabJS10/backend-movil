/*
model Stats {
  id         Int @id @default(autoincrement())
  goal       Int @db.Integer
  assist     Int @db.Integer
  yellowCard Int @db.Integer
  redCard    Int @db.Integer

  playerId Int
  matchId  Int

  player Player @relation("StatsOfThePlayer", fields: [playerId], references: [id])
  match  Match  @relation("StatsOfTheMatch", fields: [matchId], references: [id])

  @@map("stats")
}

*/

import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateStatDto {

  @IsInt()
  @IsNotEmpty()
  goal: number;

  @IsInt()  
  @IsNotEmpty()
  assist: number;

  @IsInt()  
  @IsNotEmpty()
  yellowCard: number;

  @IsInt()  
  @IsNotEmpty()
  redCard: number;

  @IsInt()  
  @IsNotEmpty()
  playerId: number;

  @IsInt()  
  @IsNotEmpty() 
  matchId: number;

}