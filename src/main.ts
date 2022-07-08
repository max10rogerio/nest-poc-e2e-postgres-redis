import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SentryService } from '@ntegral/nestjs-sentry';
// Importing @sentry/tracing patches the global hub for tracing to work.
import '@sentry/tracing';
import { ASSETS_FOLDER_NAME, ASSETS_PATH, Env } from './config';
import { UPLOADS_FOLDER_NAME, UPLOADS_PATH } from './config/upload';
import { AppModule } from './modules/app/app.module';
import { SentryHttpExceptionFilter } from './modules/sentry/filters';

const applyUploadsConfigs = (app: NestExpressApplication): void => {
  console.log('Configuring Upload Static Paths');

  const PREFIX = `/${UPLOADS_FOLDER_NAME}/`;

  app.useStaticAssets(UPLOADS_PATH, { prefix: PREFIX });

  console.log('Configuring Assets Paths');

  app.useStaticAssets(ASSETS_PATH, { prefix: `/${ASSETS_FOLDER_NAME}/` });
};

const applySwaggerConfigs = (app: NestExpressApplication): void => {
  console.log('Configuring swagger');
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('GS-Bank')
    .setDescription('GS-Bank - API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
};

const applyApiConfigs = (app: NestExpressApplication): void => {
  console.log('Configuring API');

  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalFilters(new SentryHttpExceptionFilter(app.get<SentryService>(SentryService)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService<Env>>(ConfigService);

  applyUploadsConfigs(app);
  applyApiConfigs(app);
  applySwaggerConfigs(app);

  const port = configService.get('port');

  await app.listen(port);

  console.log(`
    Application is running on:

    ENV: ${configService.get('env')}
    
    API: http://localhost:${port}/api
    
    DOCS: http://localhost:${port}/docs

    ADMIN: http://localhost:${port}/admin
    
  `);
}

bootstrap();
