import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { InstallmentStatusEnum } from 'src/modules/policy/constants';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { FindLastInstallmentPaidRepository } from 'src/modules/policy/repositories';
import { FindLastInstallmentPaidRepositorySeeder } from './__mocks__/find-last-installment-paid.repository.mock';

describe('Repository - FindLastInstallmentPaid - e2e', () => {
  let app: INestApplication;
  let seeder: FindLastInstallmentPaidRepositorySeeder;
  let findLastInstallmentPaidRepository: FindLastInstallmentPaidRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    findLastInstallmentPaidRepository = app.get<FindLastInstallmentPaidRepository>(FindLastInstallmentPaidRepository);

    seeder = new FindLastInstallmentPaidRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should make get last installment paid for policy', async () => {
    await seeder.seed();

    const lastInstallmentPaid = await findLastInstallmentPaidRepository.findByPolicyId(1);

    expect(lastInstallmentPaid.number).toEqual(2);
    expect(lastInstallmentPaid.status).toEqual(InstallmentStatusEnum.PAID);
    expect(lastInstallmentPaid.dueDate).toEqual('2022-07-22');
  });
});
