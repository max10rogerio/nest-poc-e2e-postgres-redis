import { ConfigModule } from '@nestjs/config';
import { loadEnv } from 'src/config';
import { makeEnvFilename } from '../config/config.module';
import { dbConfiguration } from './database.config';

ConfigModule.forRoot({
  envFilePath: makeEnvFilename(),
  isGlobal: true,
  load: [loadEnv, dbConfiguration],
});

export default dbConfiguration();
