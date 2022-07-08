import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ExportModule } from 'src/modules/export/export.module';
import { CreateExportRepository } from 'src/modules/export/repositories/';
import { CreateExportRepositorySeeder, params } from './__mocks__/create-export.repository.mock';

describe('CreateExportRepository E2E', () => {
  let app: INestApplication;
  let seeder: CreateExportRepositorySeeder;
  let createExportRepository: CreateExportRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ExportModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    createExportRepository = app.get<CreateExportRepository>(CreateExportRepository);

    seeder = new CreateExportRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should be create register export', async () => {
    const exportRegister = await createExportRepository.createExport(params);
    const result = await seeder.exportExpected();

    expect(exportRegister).toEqual(result);
  });
});
