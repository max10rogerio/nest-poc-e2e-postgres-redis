import { HttpModule, HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ChargebackPaymentRepository } from 'src/modules/gateway-lydians/repositories';
import { GatewayPaymentConfigs } from 'src/modules/gateway-lydians/utils/gateway-payment-configs';
import { dataResponse } from './__mocks__/make-payment.repository.mock';

describe('ChargebackPaymentRepository - Unit', () => {
  let app: INestApplication;
  let http: HttpService;
  let chargebackPaymentRepository: ChargebackPaymentRepository;
  let gatewayPaymentConfigs: GatewayPaymentConfigs;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
      providers: [ChargebackPaymentRepository, GatewayPaymentConfigs],
    }).compile();

    app = moduleFixture.createNestApplication();
    http = app.get<HttpService>(HttpService);
    chargebackPaymentRepository = app.get<ChargebackPaymentRepository>(ChargebackPaymentRepository);
    gatewayPaymentConfigs = app.get<GatewayPaymentConfigs>(GatewayPaymentConfigs);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should make chargeback', async () => {
    const response = {
      data: dataResponse,
      headers: {},
      config: { url: '/api/conta-lanc-estorno' },
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(http, 'post').mockImplementation(() => of(response));
    jest.spyOn(gatewayPaymentConfigs, 'getToken').mockReturnValue('token');
    jest.spyOn(gatewayPaymentConfigs, 'makeUrl').mockReturnValue('https://unit-test.com.br/api/conta-lanc-estorno');

    const result = await chargebackPaymentRepository.chargebackPayment('89394faa-0ed3-47aa-812d-f0c4337fa301');
    expect(result).toEqual(dataResponse);
  });
});
