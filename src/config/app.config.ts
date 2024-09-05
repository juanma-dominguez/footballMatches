import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsPort, IsString, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV = Environment.Development;

  @IsString()
  @IsNotEmpty()
  MONGODB_CONNECTION_STRING: string;

  @IsPort()
  @IsOptional()
  PORT = '3000';
}

export interface IConfig {
  environment: Environment;
  mongodb_connection_string: string;
  port: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export const EnvConfiguration = (): IConfig => ({
  environment: process.env.NODE_ENV as Environment,
  mongodb_connection_string: process.env.MONGODB_CONNECTION_STRING,
  port: parseInt(process.env.PORT),
});
