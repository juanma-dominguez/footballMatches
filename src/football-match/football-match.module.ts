import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FootballMatchService } from './football-match.service';
import { FootballMatchController } from './football-match.controller';
import { FootballMatchRepository } from './football-match.repository';
import { FootballMatch, FootballMatchSchema } from './schemas/football-match.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: FootballMatch.name, schema: FootballMatchSchema }]), SharedModule],
  controllers: [FootballMatchController],
  providers: [FootballMatchService, FootballMatchRepository],
})
export class FootballMatchModule {}
