import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { GatewayLydiansModule } from 'src/modules/gateway-lydians/gateway-lydians.module';
import { SavePaymentRepository } from 'src/modules/gateway-lydians/repositories';
import { SavePaymentRepositorySeeder } from './__mocks__/save-payment.repository.mock';

describe('SavePaymentRepository (e2e)', () => {
  let app: INestApplication;
  let seeder: SavePaymentRepositorySeeder;
  let savePaymentRepository: SavePaymentRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GatewayLydiansModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    seeder = new SavePaymentRepositorySeeder();
    savePaymentRepository = moduleFixture.get<SavePaymentRepository>(SavePaymentRepository);

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should save payment and return id', async () => {
    const expected = await seeder.getDataToSave();

    const paymentId = await savePaymentRepository.savePayment(expected);

    expect(paymentId).toEqual(1);

    const paymentSaved = await seeder.getFirstPayment();
    expect(paymentSaved).toEqual(expect.objectContaining(expected));
  });
});
