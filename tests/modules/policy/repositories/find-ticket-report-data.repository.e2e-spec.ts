import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PolicyNotFound } from 'src/errors';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { FindTicketReportDataRepository } from 'src/modules/policy/repositories';
import { FindTicketReportDataRepositorySeeder } from './__mocks__/find-ticket-report-data.repository.mock';

describe('FindTicketReportDataRepository - e2e', () => {
  let app: INestApplication;
  let seeder: FindTicketReportDataRepositorySeeder;
  let findTicketReportDatadRepository: FindTicketReportDataRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    findTicketReportDatadRepository = app.get<FindTicketReportDataRepository>(FindTicketReportDataRepository);
    seeder = new FindTicketReportDataRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('Error - Policy not found', async () => {
    await expect(findTicketReportDatadRepository.findPolicyReportData(1)).rejects.toThrow(PolicyNotFound);
  });

  it('Should be return data report for policy residential', async () => {
    await seeder.seed();

    const result = await findTicketReportDatadRepository.findPolicyReportData(1);
    result.policy.createdAt = undefined;

    expect(result).toEqual(seeder.residentialExpected);
  });

  it('Should be return data report for policy default', async () => {
    await seeder.seed();
    await seeder.updateProdutToTypeDefault();

    const result = await findTicketReportDatadRepository.findPolicyReportData(1);
    result.policy.createdAt = undefined;

    expect(result).toEqual(seeder.defaultExpected);
  });
});
