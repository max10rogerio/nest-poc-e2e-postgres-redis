import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/config';
import { ConfigModule } from '../config/config.module';
import { ExportQueueModule } from './export';
import { MailQueueModule } from './mail';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Env>) => ({
        redis: {
          host: 'redis',
          port: 6379,
          enableReadyCheck: false,
          enableOfflineQueue: true,
          maxRetriesPerRequest: null,
          keepAlive: 10000,
          lazyConnect: true,
        },
        prefix: `gsbank-${configService.get('env')}`,
        defaultJobOptions: {
          removeOnComplete: true,
        },
      }),
    }),
    MailQueueModule,
    ExportQueueModule,
  ],
  exports: [ExportQueueModule],
})
export class QueueModule {}
