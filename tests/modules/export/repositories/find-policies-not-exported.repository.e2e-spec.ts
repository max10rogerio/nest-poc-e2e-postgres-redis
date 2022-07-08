import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ExportModule } from 'src/modules/export/export.module';
import { FindPoliciesNotExportedRepository } from 'src/modules/export/repositories/';
import { FindPoliciesNotExportedRepositorySeeder } from './__mocks__/find-policies-not-exported.repository.mock';

jest.setTimeout(20000);

describe('FindPoliciesNotExportedRepository E2E', () => {
  let app: INestApplication;
  let seeder: FindPoliciesNotExportedRepositorySeeder;
  let findPoliciesNotExportedRepository: FindPoliciesNotExportedRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ExportModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    findPoliciesNotExportedRepository = app.get<FindPoliciesNotExportedRepository>(FindPoliciesNotExportedRepository);

    seeder = new FindPoliciesNotExportedRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should be return policy residential not exported', async () => {
    await seeder.seedResidential();

    const policyResidential = await findPoliciesNotExportedRepository.findPoliciesNotExportedResidential();
    const resultExpected = await seeder.policyResidentialExpected();

    expect(policyResidential.length).toEqual(1);
    expect(policyResidential).toEqual(resultExpected);
  });

  it('should be return policy DIH not exported', async () => {
    await seeder.seedDIH();

    const policyDih = await findPoliciesNotExportedRepository.findPoliciesNotExportedDIH();
    const resultExpected = await seeder.policyDihExpected();

    expect(policyDih.length).toEqual(1);
    expect(policyDih).toEqual(resultExpected);
  });

  it('should be NOT return policy EXPORTED', async () => {
    await seeder.seedDihExported();

    const policyExported = await findPoliciesNotExportedRepository.findPoliciesNotExportedDIH();

    expect(policyExported.length).toEqual(0);
  });

  it('should be NOT return policy CANCELED', async () => {
    await seeder.seedDihCanceled();

    const policyCanceled = await findPoliciesNotExportedRepository.findPoliciesNotExportedDIH();

    expect(policyCanceled.length).toEqual(0);
  });

  it('should be return policy exported with ERROR', async () => {
    await seeder.seedExportedWithError();

    const policy = await findPoliciesNotExportedRepository.findPoliciesNotExportedDIH();
    const resultExpected = await seeder.policyDihExpected();

    expect(policy.length).toEqual(1);
    expect(policy).toEqual(resultExpected);
  });
});
