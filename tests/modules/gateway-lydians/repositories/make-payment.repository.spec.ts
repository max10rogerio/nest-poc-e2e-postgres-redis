import { HttpModule, HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { Env } from 'src/config';
import { DatabaseModule } from 'src/modules/database/database.module';
import { MakePaymentRepository } from 'src/modules/gateway-lydians/repositories';
import { GatewayPaymentConfigs } from 'src/modules/gateway-lydians/utils/gateway-payment-configs';
import { dataResponse, params } from './__mocks__/make-payment.repository.mock';

describe('MakePaymentRepository (Unit)', () => {
  let app: INestApplication;
  let http: HttpService;
  let makePaymentRepository: MakePaymentRepository;
  let gatewayPaymentConfigs: GatewayPaymentConfigs;

  beforeEach(async () => {
    process.env.GATEWAY_PAYMENT_URL = 'https://test/api';
    process.env.GATEWAY_PAYMENT_TOKEN = 'eyJ0eXA';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
      providers: [MakePaymentRepository, GatewayPaymentConfigs],
    }).compile();

    app = moduleFixture.createNestApplication();
    http = app.get<HttpService>(HttpService);
    makePaymentRepository = app.get<MakePaymentRepository>(MakePaymentRepository);
    gatewayPaymentConfigs = app.get<GatewayPaymentConfigs>(GatewayPaymentConfigs);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should make payment', async () => {
    const response = {
      data: dataResponse,
      headers: {},
      config: { url: '/api/conta-lanc-incluir' },
      status: 200,
      statusText: 'OK',
    };

    const { gateway_payment }: Partial<Env> = {
      gateway_payment: {
        gateway_cod_hist: 201,
        gateway_cod_oper_cp: 1,
        gateway_timeout: 25,
        gateway_token: 'eyJ0eXA',
        gateway_url: 'https://test/',
      },
    };

    jest.spyOn(http, 'post').mockImplementation(() => of(response));
    jest.spyOn(gatewayPaymentConfigs, 'makeUrl').mockReturnValue('https://test/api/route/');
    jest.spyOn(gatewayPaymentConfigs, 'getToken').mockReturnValue('token');
    jest.spyOn(gatewayPaymentConfigs, 'getGatewayPaymentConfig').mockReturnValue(gateway_payment);

    const result = await makePaymentRepository.makePayment(params);
    expect(result).toEqual(dataResponse);
  });
});
