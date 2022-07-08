import { HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { Env } from 'src/config';
import { SendSmsRepository } from 'src/modules/sms/repositories';
import { SmsModule } from 'src/modules/sms/sms.module';
import { makeSMSHttpParamsMock, makeSmsHttpResponseMock } from './__mocks__/send-sms.repository.mock';

describe('SendSmsRepository - Unit', () => {
  let app: INestApplication;
  let http: HttpService;
  let sendSmsRepository: SendSmsRepository;
  let configService: ConfigService<Env>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SmsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    http = app.get<HttpService>(HttpService);
    configService = app.get<ConfigService<Env>>(ConfigService);
    sendSmsRepository = app.get<SendSmsRepository>(SendSmsRepository);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be send a sms', async () => {
    const paramsMock = {
      message: 'test',
      phoneNumber: '99999999999',
    };

    const httpParamsMock = makeSMSHttpParamsMock({
      password: configService.get<Env['sms']>('sms').password,
      user: configService.get<Env['sms']>('sms').user,
      message: paramsMock.message,
      phoneNumber: paramsMock.phoneNumber,
    });

    const httpResponseMock = makeSmsHttpResponseMock();

    jest.spyOn(http, 'post').mockImplementation(() => of({ data: httpResponseMock, status: 200 } as any));

    await expect(sendSmsRepository.send(paramsMock)).resolves.toEqual(httpResponseMock);
    expect(http.post).toHaveBeenCalledWith(configService.get<Env['sms']>('sms').url, httpParamsMock);
  });
});
