import { INestApplication, Logger } from '@nestjs/common';
import { OpenAPIObject, DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import * as _camelCase from 'lodash/camelCase';
import * as SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPI } from 'openapi-types';

export const generateSyncApiDoc = async (app: INestApplication): Promise<OpenAPIObject> => {
  const logger = new Logger('generateSyncApiDoc');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('WameSports')
    .setDescription(`WameSports API definition`)
    .setVersion('v1')
    .addServer('http://localhost:3000', 'local')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      const prefix = _camelCase(controllerKey.replace(/controller$/i, ''));
      return `${prefix}_${methodKey}`;
    },
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, options);

  try {
    // We create a copy of the document object because SwaggerParser.validate dereferences all the
    // schemas and it results in a bigger schema and very ugly type names in the clients that we generate
    // from the openapi definition.
    const api = await SwaggerParser.validate(JSON.parse(JSON.stringify(document)) as OpenAPI.Document);
    logger.log(`API ${api.info.title} ${api.info.version} is valid!`);
  } catch (err) {
    logger.error('OpenAPI spec not valid!');
    throw err;
  }

  SwaggerModule.setup('docs', app, document);
  logger.log(`Sync API documentation available at /docs`);
  return document;
};
