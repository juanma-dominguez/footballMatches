import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { generateSyncApiDoc } from './utils/apiDocs';
import { Environment } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

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

  const configService = app.get(ConfigService);

  const env = configService.get('environment');
  if (env !== Environment.Production) {
    await generateSyncApiDoc(app);
  }

  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
