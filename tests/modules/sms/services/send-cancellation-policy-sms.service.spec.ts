import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  SendCancellationPolicySmsService,
  SendCancellationPolicySmsServiceParams,
  SendSmsService,
} from 'src/modules/sms/services';
import { SmsModule } from 'src/modules/sms/sms.module';

describe('SendCancellationPolicySmsService - Unit', () => {
  let app: INestApplication;
  let sendSmsService: SendSmsService;
  let sendCancellationPolicySmsService: SendCancellationPolicySmsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SmsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    sendSmsService = app.get<SendSmsService>(SendSmsService);
    sendCancellationPolicySmsService = app.get<SendCancellationPolicySmsService>(SendCancellationPolicySmsService);

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

    await expect(sendCancellationPolicySmsService.send(paramsMock)).resolves.toEqual(void 0);

    expect(sendSmsService.send).toHaveBeenCalledWith({
      message: `Oi John! Infelizmente não conseguimos realizar a cobrança do seguro em sua conta. Por isso, ele foi cancelado automaticamente. Att, Seguros Gazin Bank.`,
      phoneNumber: paramsMock.phoneNumber,
    });
  });
});
