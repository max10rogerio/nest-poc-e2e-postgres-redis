import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const configs = configService.get('typeormConfig');

        console.log(JSON.stringify(configs, null, 2))

        return configs;
      },
    }),
  ],
})
export class DatabaseModule {}
