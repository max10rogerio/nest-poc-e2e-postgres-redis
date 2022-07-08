import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { QueueModule } from '../queue/queue.module';
import { SentryModule } from '../sentry/sentry.module';
import { CronBootstrap } from './cron.bootstrap';
import { ExportCronModule } from './export/export-cron.module';

@Module({
  imports: [ConfigModule, QueueModule, DatabaseModule, SentryModule, ScheduleModule.forRoot(), ExportCronModule],
  providers: [CronBootstrap],
})
export class CronModule {}
