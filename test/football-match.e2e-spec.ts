import { INestApplication, InternalServerErrorException } from '@nestjs/common';
import * as request from 'supertest';
import { StartedMongoDBContainer } from '@testcontainers/mongodb';
import { setupMongodb } from './utils/mongodb';
import { setupApp } from './utils/app';
import { CreateFootballMatchDto } from '../src/football-match/dto/football-match.dto';
import { FootballMatchService } from '../src/football-match/football-match.service';

describe('FootballMatchController (e2e)', () => {
  let app: INestApplication;
  let footballMatchService: FootballMatchService;
  let mongodbContainer: StartedMongoDBContainer;

  beforeAll(async () => {
    mongodbContainer = await setupMongodb();
  });

  beforeEach(async () => {
    app = await setupApp(mongodbContainer);
    await app.init();
    footballMatchService = app.get<FootballMatchService>(FootballMatchService);
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await mongodbContainer.stop();
  });

  it('POST /api/v1/football-match - Should create a football match', async () => {
    const createFootballMatch: CreateFootballMatchDto = {
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      matchDate: '2021-01-01T00:00:00Z',
    };
    let idCreated;
    // 1. Check database has no data
    await request(app.getHttpServer())
      .get(`/api/v1/football-match/`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toStrictEqual([]);
      });
    // 2. Create database record
    await request(app.getHttpServer())
      .post('/api/v1/football-match')
      .send(createFootballMatch)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty('id');
        idCreated = body.id;
      });
    // 4. Check database has our record
    await request(app.getHttpServer())
      .get(`/api/v1/football-match/${idCreated}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty('id', idCreated);
      });
    // 5. Check database has only our record
    await request(app.getHttpServer())
      .get(`/api/v1/football-match/`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(1);
        expect(body[0]).toHaveProperty('id', idCreated);
      });
    // 6. Check wrong ID not found
    await request(app.getHttpServer())
      .get(`/api/v1/football-match/wrong-id`)
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it('POST /api/v1/football-match - Should return bad request with wrong params', async () => {
    const wrongParams = {
      homeTeam: 'Team A',
    };
    await request(app.getHttpServer()).post('/api/v1/football-match').send(wrongParams).expect(400);
  });

  it('POST /api/v1/football-match - Should return a server error if service fail', async () => {
    const createFootballMatch: CreateFootballMatchDto = {
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      matchDate: '2021-01-01T00:00:00Z',
    };

    jest.spyOn(footballMatchService, 'create').mockRejectedValueOnce(InternalServerErrorException);

    await request(app.getHttpServer()).post('/api/v1/football-match').send(createFootballMatch).expect(500);
  });
});
