import { Test, TestingModule } from '@nestjs/testing';
import { FootballMatchService } from './football-match.service';
import { FootballMatchRepository } from './football-match.repository';
import { CreateFootballMatchDto, FootballMatchDto } from './dto/football-match.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('FootballMatchService', () => {
  let footballMatchService: FootballMatchService;
  let footballMatchRepository: FootballMatchRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FootballMatchService,
        {
          provide: FootballMatchRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    footballMatchService = module.get<FootballMatchService>(FootballMatchService);
    footballMatchRepository = module.get<FootballMatchRepository>(FootballMatchRepository);
  });

  describe('create', () => {
    it('Should create a FootBallMatch and response a FootballMatchDto', async () => {
      const createFootballMatchDto: CreateFootballMatchDto = {
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        matchDate: '2021-01-01T00:00:00Z',
      };

      const expectedFootballMatchDto: FootballMatchDto = {
        id: '67de3625-fe7b-46a6-9794-f8418dc4c27b',
        ...createFootballMatchDto,
      };

      jest.spyOn(footballMatchRepository, 'create').mockResolvedValue(expectedFootballMatchDto);

      const result = await footballMatchService.create(createFootballMatchDto);

      expect(footballMatchRepository.create).toHaveBeenCalledWith({
        id: expect.any(String),
        ...createFootballMatchDto,
      });
      expect(result).toEqual(expectedFootballMatchDto);
    });

    it('should return an InternalServerErrorException if there is an error', async () => {
      const createFootballMatchDto: CreateFootballMatchDto = {
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        matchDate: '2021-01-01T00:00:00Z',
      };

      jest.spyOn(footballMatchRepository, 'create').mockRejectedValue(new Error('DB Error'));

      await expect(footballMatchService.create(createFootballMatchDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('Should return a FootballMatchDto array', async () => {
      const footballMatches: FootballMatchDto[] = [
        {
          id: '67de3625-fe7b-46a6-9794-f8418dc4c27a',
          homeTeam: 'Team A',
          awayTeam: 'Team B',
          matchDate: '2021-01-01T00:00:00Z',
        },
        {
          id: '67de3625-fe7b-46a6-9794-f8418dc4c27b',
          homeTeam: 'Team C',
          awayTeam: 'Team D',
          matchDate: '2021-01-01T00:00:00Z',
        },
      ];

      jest.spyOn(footballMatchRepository, 'findAll').mockResolvedValue(footballMatches);

      const result = await footballMatchService.findAll();

      expect(footballMatchRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(footballMatches);
    });

    it('should return an InternalServerErrorException if there is an error', async () => {
      jest.spyOn(footballMatchRepository, 'findAll').mockRejectedValue(new Error('DB Error'));

      await expect(footballMatchService.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findById', () => {
    it('should return a FootballMatchDto', async () => {
      const footballMatch: FootballMatchDto = {
        id: '1',
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        matchDate: '2021-01-01T00:00:00Z',
      };

      jest.spyOn(footballMatchRepository, 'findById').mockResolvedValue(footballMatch);

      const result = await footballMatchService.findById('1');

      expect(footballMatchRepository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(footballMatch);
    });

    it('should return a NotFoundException if no source', async () => {
      jest.spyOn(footballMatchRepository, 'findById').mockResolvedValue(null);

      await expect(footballMatchService.findById('1')).rejects.toThrow(NotFoundException);
    });
  });
});
