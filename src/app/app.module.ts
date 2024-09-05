import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { EnvConfiguration, validate } from '../config/app.config';
import { FootballMatchModule } from '../football-match/football-match.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validate,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          ...(configService.get('environment') !== 'production' && {
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
          }),
          serializers: {
            req(req) {
              // Remove if headers needs to be checked
              req.headers = 'hidden';
              return req;
            },
            res(res) {
              res.headers = 'hidden';
              return res;
            },
          },
          formatters: {
            level: (label: string) => {
              return { level: label };
            },
          },
        },
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongodb_connection_string'),
      }),
    }),
    FootballMatchModule,
    SharedModule,
  ],
})
export class AppModule {}
