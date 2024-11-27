import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [UsersModule, TeamsModule, PlayersModule, MatchesModule, StatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
