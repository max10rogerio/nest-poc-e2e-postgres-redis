import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { CreateInstallmentRepository } from 'src/modules/policy/repositories';
import {
  createInstallmentParams,
  createInstallmentResponse,
} from '../services/__mocks__/create-installment.service.mock';
import { CreateInstallmentRepositorySeeder } from './__mocks__/create-installment.repository.mock';

describe('[Repository] CreateInstallmentRepository (e2e)', () => {
  let app: INestApplication;
  let createInstallmentRepository: CreateInstallmentRepository;
  let seeder: CreateInstallmentRepositorySeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    seeder = new CreateInstallmentRepositorySeeder();
    createInstallmentRepository = app.get<CreateInstallmentRepository>(CreateInstallmentRepository);

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should create installment', async () => {
    await seeder.seed();

    const [expected] = createInstallmentResponse();

    const [params] = createInstallmentParams();

    const installment = await createInstallmentRepository.createInstallment(params);

    const received = await seeder.installmentRepository.findOne(installment.id);

    expect(received).toEqual(expect.objectContaining(expected));
  });
});
