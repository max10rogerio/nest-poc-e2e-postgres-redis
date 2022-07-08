import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SentryModule as SentryModulePkg } from '@ntegral/nestjs-sentry';
import { Env, isDevOrTest } from 'src/config';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    SentryModulePkg.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Env>) => ({
        dsn: configService.get('sentry_dsn'),
        environment: configService.get('env'),
        enabled: !isDevOrTest,
        tracesSampleRate: 1.0,
      }),
    }),
  ],
})
export class SentryModule {}
