import { Test, TestingModule } from '@nestjs/testing';
import { FootballMatchController } from './football-match.controller';
import { FootballMatchService } from './football-match.service';
import { FootballMatchDto, CreateFootballMatchDto } from './dto/football-match.dto';

describe('FootballMatchController', () => {
  let footballMatchController: FootballMatchController;
  let footballMatchService: FootballMatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FootballMatchController],
      providers: [
        {
          provide: FootballMatchService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    footballMatchController = module.get<FootballMatchController>(FootballMatchController);
    footballMatchService = module.get<FootballMatchService>(FootballMatchService);
  });

  describe('create', () => {
    it('should create a football match', async () => {
      const createFootballMatchDto: CreateFootballMatchDto = {
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        matchDate: '2021-01-01T00:00:00Z',
      };

      const footballMatchDto: FootballMatchDto = {
        id: '67de3625-fe7b-46a6-9794-f8418dc4c27b',
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        matchDate: '2021-01-01T00:00:00Z',
      };

      jest.spyOn(footballMatchService, 'create').mockResolvedValue(footballMatchDto);

      const result = await footballMatchController.create(createFootballMatchDto);

      expect(footballMatchService.create).toHaveBeenCalledWith(createFootballMatchDto);
      expect(result).toEqual(footballMatchDto);
    });

    describe('findAll', () => {
      it('should call service.findAll and return an array of football matches', async () => {
        const matches: FootballMatchDto[] = [
          { id: '1', homeTeam: 'Team A', awayTeam: 'Team B', matchDate: '2021-01-01T00:00:00Z' },
        ];

        const findAllSpy = jest.spyOn(footballMatchService, 'findAll').mockResolvedValue(matches);

        const result = await footballMatchController.findAll();
        expect(result).toEqual(matches);
        expect(findAllSpy).toHaveBeenCalled();
      });
    });

    describe('findOne', () => {
      it('should call service.findById and return the football match by ID', async () => {
        const match: FootballMatchDto = {
          id: '1',
          homeTeam: 'Team A',
          awayTeam: 'Team B',
          matchDate: '2021-01-01T00:00:00Z',
        };

        const findByIdSpy = jest.spyOn(footballMatchService, 'findById').mockResolvedValue(match);

        const result = await footballMatchController.findOne('1');
        expect(result).toEqual(match);
        expect(findByIdSpy).toHaveBeenCalledWith('1');
      });
    });
  });
});
