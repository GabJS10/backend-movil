/*
model Match {
  id            Int      @id @default(autoincrement())
  date          DateTime
  location      String   @db.VarChar(255)
  score_local   Int      @db.Integer
  score_visitor Int      @db.Integer

  localTeamId   Int
  visitorTeamId Int

  localTeam   Team @relation("Local", fields: [localTeamId], references: [id])
  visitorTeam Team @relation("Visitor", fields: [visitorTeamId], references: [id])

  matchStats Stats[] @relation("StatsOfTheMatch")

  @@unique([localTeamId, visitorTeamId, date])
  @@map("matches")
}
*/
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMatchDto {

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  score_local: number;

  @IsNumber()
  @IsNotEmpty()
  score_visitor: number;

  @IsString()
  @IsNotEmpty()
  localTeamId: string;

  @IsString()
  @IsNotEmpty()
  visitorTeamId: string;


}