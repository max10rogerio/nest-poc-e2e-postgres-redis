import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ExportModule } from 'src/modules/export/export.module';
import { UpdatePolicyExportedRepository } from 'src/modules/export/repositories/';
import { UpdatePolicyExportedRepositorySeeder } from './__mocks__/update-policy-exported.repository.mock';

describe('UpdatePolicyExportedRepository E2E', () => {
  let app: INestApplication;
  let seeder: UpdatePolicyExportedRepositorySeeder;
  let updatePolicyExportedRepository: UpdatePolicyExportedRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ExportModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    updatePolicyExportedRepository = app.get<UpdatePolicyExportedRepository>(UpdatePolicyExportedRepository);

    seeder = new UpdatePolicyExportedRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should be update policies exported', async () => {
    await seeder.seed();

    const policiesIds = await seeder.getPoliciesIds();
    const routineId = await seeder.getRoutine();

    const result = await updatePolicyExportedRepository.updatePoliciesExported(policiesIds, routineId);

    const policyExported = await seeder.getPoliciesExported();

    expect(result).toEqual(true);

    policyExported.forEach(function (value) {
      expect(value.exportId).toEqual(routineId);
    });
  });
});
