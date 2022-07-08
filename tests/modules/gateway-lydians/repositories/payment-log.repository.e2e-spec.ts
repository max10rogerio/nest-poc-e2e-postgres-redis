import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { GatewayLydiansModule } from 'src/modules/gateway-lydians/gateway-lydians.module';
import { PaymentLogRepository } from 'src/modules/gateway-lydians/repositories';
import { PaymentLogRepositorySeeder } from './__mocks__/payment-log.repository.mock';

describe('PaymentLogRepository (e2e)', () => {
  let app: INestApplication;
  let seeder: PaymentLogRepositorySeeder;
  let paymentLogRepository: PaymentLogRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GatewayLydiansModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    seeder = new PaymentLogRepositorySeeder();
    paymentLogRepository = moduleFixture.get<PaymentLogRepository>(PaymentLogRepository);

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should save paymentLog and return id', async () => {
    const request = '{"TimeOut":25,"CodAgencia":1';
    const response = '{"request_id": "81c1ec4b-d72c-40a6-a14b-877fa06dd29a","application_name": "API Seguros"}';

    const logToSave = {
      cpf: '18474412030',
      value: 9.9,
      statusCode: 200,
      request: request,
      response: response,
    };

    const logId = await paymentLogRepository.saveLog(logToSave);

    expect(logId).toEqual(1);

    const logSaved = await seeder.getFirstLog();
    expect(logSaved).toEqual(expect.objectContaining(logToSave));
  });
});
