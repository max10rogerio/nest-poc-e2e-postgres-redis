import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { CancelPolicyRepository } from 'src/modules/policy/repositories';
import { CancelPolicyRepositorySeeder } from './__mocks__/cancel-policy.repository.mock';

describe('Repository - CancelPolicyRepository - e2e', () => {
  let app: INestApplication;
  let cancelPolicyRepository: CancelPolicyRepository;
  let seeder: CancelPolicyRepositorySeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    seeder = new CancelPolicyRepositorySeeder();
    cancelPolicyRepository = app.get<CancelPolicyRepository>(CancelPolicyRepository);

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should cancel policy with coverageEndDate today', async () => {
    const policyId = await seeder.seedPolicy();

    const policyCancelled = await cancelPolicyRepository.cancel(policyId, new Date());

    expect(policyCancelled.status).toEqual(PolicyStatusEnum.CANCELLED);
    expect(policyCancelled.cancellationDate.toDateString()).toEqual(new Date().toDateString());
    expect(policyCancelled.coverageEndDate.toDateString()).toEqual(new Date().toDateString());
  });

  it('should cancel policy with coverageEndDate future', async () => {
    const policyId = await seeder.seedPolicy();
    const coverageEndDate = dayjs().add(10, 'days').toDate();

    const policyCancelled = await cancelPolicyRepository.cancel(policyId, coverageEndDate);

    expect(policyCancelled.status).toEqual(PolicyStatusEnum.CANCELLED);
    expect(policyCancelled.cancellationDate.toDateString()).toEqual(new Date().toDateString());
    expect(policyCancelled.coverageEndDate.toDateString()).toEqual(coverageEndDate.toDateString());
  });
});
