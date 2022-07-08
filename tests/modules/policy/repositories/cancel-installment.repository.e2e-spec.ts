import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { InstallmentStatusEnum } from 'src/modules/policy/constants';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { CancelInstallmentRepository } from 'src/modules/policy/repositories';
import { CancelInstallmentRepositorySeeder } from './__mocks__/cancel-installment.repository.mock';

describe('Repository - CancelInstallmentRepository - e2e', () => {
  let app: INestApplication;
  let cancelInstallmentRepository: CancelInstallmentRepository;
  let seeder: CancelInstallmentRepositorySeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    seeder = new CancelInstallmentRepositorySeeder();
    cancelInstallmentRepository = app.get<CancelInstallmentRepository>(CancelInstallmentRepository);

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('With chargeback - should chargeback first installment and cancell others installments', async () => {
    const policyId = await seeder.seedInstallments();

    await cancelInstallmentRepository.cancelInstallmentWithChargeback(policyId);

    const [firstInstallment, ...installments] = await seeder.getAllInstallments();

    expect(firstInstallment.status).toEqual(InstallmentStatusEnum.CHARGEBACKED);

    installments.forEach(function (installment) {
      expect(installment.status).toEqual(InstallmentStatusEnum.CANCELED);
    });
  });

  it('Should cancel installments only opened', async () => {
    const policyId = await seeder.seedInstallments();

    await cancelInstallmentRepository.cancelInstallmentNoChargeback(policyId);

    const [firstInstallment, ...installments] = await seeder.getAllInstallments();

    expect(firstInstallment.status).toEqual(InstallmentStatusEnum.PAID);

    installments.forEach(function (installment) {
      expect(installment.status).toEqual(InstallmentStatusEnum.CANCELED);
    });
  });
});
