import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { CreatePolicyRepository } from 'src/modules/policy/repositories';
import { CreatePolicyRepositorySeeder } from './__mocks__/create-policy.repository.mock';

describe('[Repository] CreatePolicyRepository (e2e)', () => {
  let app: INestApplication;
  let createPolicyRepository: CreatePolicyRepository;
  let seeder: CreatePolicyRepositorySeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    seeder = new CreatePolicyRepositorySeeder();
    createPolicyRepository = app.get<CreatePolicyRepository>(CreatePolicyRepository);

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should create policy with ticket number', async () => {
    await seeder.seed();

    const expected = {
      id: 1,
      luckNumber: 87001,
      ticket: '135000000000001',
    };

    const policy = await createPolicyRepository.create({
      contractNumber: 135,
      luckNumber: 87001,
      agentId: 1,
      insuredId: 1,
      iofValue: 0.38,
      liquidValue: 9.9,
      totalValue: 9.9,
      planId: 1,
      addressId: 1,
    });

    await expect(seeder.policyRepository.findOne(policy.id)).resolves.toEqual(expect.objectContaining(expected));
  });
});
