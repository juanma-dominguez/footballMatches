import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateFootballMatchDto, FootballMatchDto } from './dto/football-match.dto';
import { FootballMatchRepository } from './football-match.repository';

@Injectable()
export class FootballMatchService {
  private readonly logger = new Logger(FootballMatchService.name);
  constructor(private readonly footballMatchRepository: FootballMatchRepository) {}

  async create(FootballMatchParams: CreateFootballMatchDto): Promise<FootballMatchDto> {
    const newFootballMatch = {
      id: uuid(),
      ...FootballMatchParams,
    };
    this.logger.debug({ id: newFootballMatch.id }, `creating FootballMatch`);
    try {
      const footballMatch = await this.footballMatchRepository.create(newFootballMatch);
      this.logger.log({ id: newFootballMatch.id }, `FootballMatch created`);
      return footballMatch;
    } catch (error) {
      this.logger.error({ error }, `error creating footballMatch`);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<FootballMatchDto[]> {
    try {
      this.logger.debug(`searching all football matches`);
      return await this.footballMatchRepository.findAll();
    } catch (error) {
      this.logger.error({ error }, `error searching football matches`);
      throw new InternalServerErrorException(error);
    }
  }

  async findById(footballMatchId: string): Promise<FootballMatchDto> {
    this.logger.debug({ footballMatchId }, `searching by footballMatchId`);
    const footballMatch = await this.footballMatchRepository.findById(footballMatchId);

    if (!footballMatch) {
      this.logger.warn({ footballMatchId }, `footballMatch not found by footballMatchId`);
      throw new NotFoundException(`footballMatch not found`);
    }
    return footballMatch;
  }
}
