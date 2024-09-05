import { StartedMongoDBContainer } from '@testcontainers/mongodb';
import { ConfigModuleOptions } from '@nestjs/config';

export const prepareConfig = (mongodbContainer: StartedMongoDBContainer): ConfigModuleOptions => ({
  ignoreEnvVars: true,
  ignoreEnvFile: true,
  isGlobal: true,
  load: [
    () => ({
      environment: 'test',
      mongodb_connection_string: `${mongodbContainer.getConnectionString()}/wamesports?directConnection=true`,
      logging_level: 'debug',
    }),
  ],
});
