import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { loadEnv } from 'src/config';
import { dbConfiguration } from '../database/database.config';

export const makeEnvFilename = () => {
  const env = process.env.NODE_ENV;

  return `.${env}.env`;
};

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: makeEnvFilename(),
      isGlobal: true,
      load: [loadEnv, dbConfiguration],
    }),
  ],
})
export class ConfigModule {}
