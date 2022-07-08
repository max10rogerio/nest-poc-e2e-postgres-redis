import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  SendCancellationPolicySmsServiceParams,
  SendPaymentBillingChargeSmsService,
  SendSmsService,
} from 'src/modules/sms/services';
import { SmsModule } from 'src/modules/sms/sms.module';

describe('SendPaymentBillingChargeSmsService - Unit', () => {
  let app: INestApplication;
  let sendSmsService: SendSmsService;
  let sendPaymentBillingChargeSmsService: SendPaymentBillingChargeSmsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SmsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    sendSmsService = app.get<SendSmsService>(SendSmsService);
    sendPaymentBillingChargeSmsService = app.get<SendPaymentBillingChargeSmsService>(
      SendPaymentBillingChargeSmsService,
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be call sms service with custom message', async () => {
    const paramsMock: SendCancellationPolicySmsServiceParams = {
      insuredName: 'John Doe',
      phoneNumber: '99999999999',
    };

    jest.spyOn(sendSmsService, 'send').mockImplementation(() => Promise.resolve(void 0));

    await expect(sendPaymentBillingChargeSmsService.send(paramsMock)).resolves.toEqual(void 0);

    expect(sendSmsService.send).toHaveBeenCalledWith({
      message: `Oi John! Tentamos debitar a sua parcela do seguro, mas não deu certo. Verifique sua conta e mais tarde tentaremos de novo! Att, Seguros Gazin Bank.`,
      phoneNumber: paramsMock.phoneNumber,
    });
  });
});
