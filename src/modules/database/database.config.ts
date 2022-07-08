import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { loadEnv } from 'src/config';

const MIGRATIONS_DIR_NAME = 'migrations';

export const dbConfiguration = registerAs('typeormConfig', (): TypeOrmModuleOptions => {
  const { database, env } = loadEnv();
  const needsDropSchema = env === 'test';

  return {
    type: 'postgres',
    ...database,
    entities: [path.resolve(__dirname, '**', '*.entity{.ts,.js}')],
    migrations: [path.resolve(__dirname, '**', MIGRATIONS_DIR_NAME, '*{.ts,.js}')],
    autoLoadEntities: true,
    migrationsRun: true,
    dropSchema: needsDropSchema,
    cli: {
      migrationsDir: `src/modules/database/${MIGRATIONS_DIR_NAME}`,
    },
  };
});
