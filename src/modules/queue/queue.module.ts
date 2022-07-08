import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env, isDevOrTest } from 'src/config';
import { ConfigModule } from '../config/config.module';
import { ExportQueueModule } from './export';
import { MailQueueModule } from './mail';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Env>) => {
        const redis: Env['redis'] = configService.get('redis');

        /* istanbul ignore next */
        const tls = isDevOrTest ? undefined : {};

        return {
          redis: {
            host: redis.host,
            port: redis.port,
            password: redis.password,
            connectTimeout: 30000,
            tls,
            // https://github.com/OptimalBits/bull/issues/890#issuecomment-1048530761
            maxRetriesPerRequest: null,
            enableReadyCheck: true,
          },
          prefix: `gsbank-${configService.get('env')}`,
          defaultJobOptions: {
            removeOnComplete: true,
          },
        };
      },
    }),
    MailQueueModule,
    ExportQueueModule,
  ],
  exports: [ExportQueueModule],
})
export class QueueModule {}
