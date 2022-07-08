import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Env } from 'src/config';
import { DatabaseModule } from 'src/modules/database/database.module';
import { GatewayPaymentConfigs } from 'src/modules/gateway-lydians/utils/gateway-payment-configs';
describe('GatewayPaymentConfigs - Unit', () => {
  let app: INestApplication;
  let gatewayPaymentConfigs: GatewayPaymentConfigs;

  beforeEach(async () => {
    process.env.GATEWAY_PAYMENT_URL = 'https://test/';
    process.env.GATEWAY_PAYMENT_TOKEN = 'eyJ0eXA';
    process.env.GATEWAY_PAYMENT_TIMEOUT = '25';
    process.env.GATEWAY_PAYMENT_COD_HIST = '201';
    process.env.GATEWAY_PAYMENT_COD_OPER_CP = '1';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [GatewayPaymentConfigs],
    }).compile();

    app = moduleFixture.createNestApplication();
    gatewayPaymentConfigs = app.get<GatewayPaymentConfigs>(GatewayPaymentConfigs);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should get token Lydians', async () => {
    expect(gatewayPaymentConfigs.getToken()).toEqual('eyJ0eXA');
  });

  it('should get url - no parameters', async () => {
    expect(gatewayPaymentConfigs.makeUrl('/api/test-route/')).toEqual('https://test/api/test-route/');
  });

  it('should get url - with parameters', async () => {
    expect(gatewayPaymentConfigs.makeUrl('/api/test-route/', 'abc123-321cba')).toEqual(
      'https://test/api/test-route/abc123-321cba',
    );
  });

  it('should get payments configs', async () => {
    const { gateway_payment }: Partial<Env> = {
      gateway_payment: {
        gateway_cod_hist: 201,
        gateway_cod_oper_cp: 1,
        gateway_timeout: 25,
        gateway_token: 'eyJ0eXA',
        gateway_url: 'https://test/',
      },
    };

    expect(gatewayPaymentConfigs.getGatewayPaymentConfig()).toEqual(gateway_payment);
  });
});
