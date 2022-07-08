import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProblemsToSendSms } from 'src/errors';
import { SendSmsRepository } from 'src/modules/sms/repositories';
import { SendSmsService } from 'src/modules/sms/services';
import { SmsModule } from 'src/modules/sms/sms.module';
import { makeSmsHttpResponseMock } from '../repositories/__mocks__/send-sms.repository.mock';

describe('SendSmsService - Unit', () => {
  let app: INestApplication;
  let sendSmsRepository: SendSmsRepository;
  let sendSmsService: SendSmsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SmsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    sendSmsRepository = app.get<SendSmsRepository>(SendSmsRepository);
    sendSmsService = app.get<SendSmsService>(SendSmsService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be return a sms response', async () => {
    const paramsMock = {
      message: 'test',
      phoneNumber: '99999999999',
    };

    jest.spyOn(sendSmsRepository, 'send').mockImplementation(() => Promise.resolve(makeSmsHttpResponseMock() as any));

    await expect(sendSmsService.send(paramsMock)).resolves.toEqual(void 0);
  });

  it('should return an error ProblemsToSendSms when sms api crashes', async () => {
    const paramsMock = {
      message: 'test',
      phoneNumber: '99999999999',
    };

    jest.spyOn(sendSmsRepository, 'send').mockImplementation(() => Promise.reject(new ProblemsToSendSms('error')));

    await expect(sendSmsService.send(paramsMock)).rejects.toThrow(ProblemsToSendSms);
  });
});
