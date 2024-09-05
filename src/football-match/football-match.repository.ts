import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { FootballMatch } from './schemas/football-match.schema';
import { CreateFootballMatchDto, FootballMatchDto } from './dto/football-match.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FootballMatchRepository {
  constructor(
    @InjectModel(FootballMatch.name)
    private readonly FootballMatchModel: Model<FootballMatch>,
  ) {}

  async findAll(): Promise<FootballMatchDto[]> {
    const results = await this.FootballMatchModel.find();
    return results.map(result =>
      plainToInstance(FootballMatchDto, result, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findById(id: string): Promise<FootballMatchDto> {
    const footballMatch = await this.FootballMatchModel.findOne({
      id,
    });
    return plainToInstance(FootballMatchDto, footballMatch, {
      excludeExtraneousValues: true,
    });
  }

  async create(footballMatch: CreateFootballMatchDto): Promise<FootballMatchDto> {
    const newFootballMatch = await this.FootballMatchModel.create(footballMatch);
    return plainToInstance(FootballMatchDto, newFootballMatch, {
      excludeExtraneousValues: true,
    });
  }
}
