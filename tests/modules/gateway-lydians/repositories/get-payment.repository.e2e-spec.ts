import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PaymentsEntity } from 'src/modules/database/models';
import { GatewayLydiansModule } from 'src/modules/gateway-lydians/gateway-lydians.module';
import { GetPaymentRepository } from 'src/modules/gateway-lydians/repositories';
import { GetPaymentRepositorySeeder } from './__mocks__/get-payment.repository.mock';

describe('GetPaymentRepository - e2e', () => {
  let app: INestApplication;
  let seeder: GetPaymentRepositorySeeder;
  let getPaymentRepository: GetPaymentRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GatewayLydiansModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    seeder = new GetPaymentRepositorySeeder();
    getPaymentRepository = moduleFixture.get<GetPaymentRepository>(GetPaymentRepository);

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should get payment entity', async () => {
    await seeder.seed();

    const payment = await getPaymentRepository.getPaymentByInstallment(1);

    expect(payment).toBeInstanceOf(PaymentsEntity);
  });
});
