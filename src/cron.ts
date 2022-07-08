import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SentryService } from '@ntegral/nestjs-sentry';
// Importing @sentry/tracing patches the global hub for tracing to work.
import '@sentry/tracing';
import { Env } from './config';
import { CronModule } from './modules/cron/cron.module';
import { SentryHttpExceptionFilter } from './modules/sentry/filters';

const applyApiConfigs = (app: NestExpressApplication): void => {
  app.useGlobalFilters(new SentryHttpExceptionFilter(app.get<SentryService>(SentryService)));
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CronModule);
  const configService = app.get<ConfigService<Env>>(ConfigService);

  applyApiConfigs(app);

  const port = configService.get('port');

  await app.listen(port);
}

bootstrap();
