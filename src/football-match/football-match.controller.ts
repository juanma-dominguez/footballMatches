import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FootballMatchService } from './football-match.service';
import { FootballMatchDto, CreateFootballMatchDto } from './dto/football-match.dto';

@ApiTags('Football matches')
@Controller({
  version: '1',
  path: 'football-match',
})
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiInternalServerErrorResponse({ description: 'Internal error' })
@ApiNotFoundResponse({ description: 'Resource not found' })
export class FootballMatchController {
  private readonly logger = new Logger(FootballMatchController.name);
  constructor(private readonly footballMatchService: FootballMatchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a football match' })
  @ApiCreatedResponse({
    description: 'Football match created successfully',
    type: FootballMatchDto,
  })
  async create(@Body() createFootballMatchDto: CreateFootballMatchDto): Promise<FootballMatchDto> {
    return this.footballMatchService.create(createFootballMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all football matches' })
  @ApiOkResponse({
    description: 'Returns an array of football matches',
    type: [FootballMatchDto],
  })
  async findAll(): Promise<FootballMatchDto[]> {
    return this.footballMatchService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a football match by ID' })
  @ApiOkResponse({
    description: 'Returns a football match',
    type: FootballMatchDto,
  })
  @ApiNotFoundResponse({
    description: 'No source with the specified ID',
  })
  async findOne(@Param('id') id: string): Promise<FootballMatchDto> {
    return this.footballMatchService.findById(id);
  }
}
