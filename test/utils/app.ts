import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { prepareConfig } from './config';
import { AppModule } from '../../src/app/app.module';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { StartedMongoDBContainer } from '@testcontainers/mongodb';

export const setupApp = async (mongodbContainer: StartedMongoDBContainer): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot(prepareConfig(mongodbContainer)), AppModule],
  }).compile();
  const app = moduleFixture.createNestApplication();

  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  return app;
};
