import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';

export const setupMongodb = async (): Promise<StartedMongoDBContainer> =>
  await new MongoDBContainer('mongo:7.0.14').start();
