import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Env, loadEmailEnvs } from 'src/config';
import { MailModule } from 'src/modules/mail/mail.module';
import { SendEmailService } from 'src/modules/mail/services/send-email.service';

describe('SendMailService - Unit', () => {
  let sendMailService: SendEmailService;
  let mailerService: MailerService;
  let configService: ConfigService<Env>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const app: TestingModule = await Test.createTestingModule({
      imports: [MailModule],
    }).compile();

    sendMailService = app.get<SendEmailService>(SendEmailService);
    mailerService = app.get<MailerService>(MailerService);
    configService = app.get<ConfigService>(ConfigService);
  });

  it('should be call overwrite param "from" when has env mail mock', async () => {
    const mailMock = 'mail@mock.com';

    jest.spyOn(mailerService, 'sendMail').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(configService, 'get').mockReturnValue({
      ...loadEmailEnvs(),
      mailMock,
    });

    const from = sendMailService.makeFrom();

    const params = {
      to: 'test@test.com',
      subject: 'Test',
      html: 'test',
      from,
    };

    await sendMailService.send(params);

    const expected = { ...params, to: mailMock };

    expect(mailerService.sendMail).toHaveBeenCalledWith(expected);
  });

  it('should be call overwrite param "subject" when has env mail mock', async () => {
    const mailMock = 'mail@mock.com';
    jest.spyOn(mailerService, 'sendMail').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(configService, 'get').mockReturnValue({
      ...loadEmailEnvs(),
      mailMock,
    });
    const from = sendMailService.makeFrom();

    const params = {
      to: 'test@test.com',
      subject: 'test Subject',
      html: 'test',
      from,
    };

    await sendMailService.send(params);

    const expected = { ...params, to: mailMock };

    expect(mailerService.sendMail).toHaveBeenCalledWith(expected);
  });

  it('should be call pass incomming email without overwrite by mail mock', async () => {
    jest.spyOn(mailerService, 'sendMail').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(configService, 'get').mockReturnValue({
      mail: {
        ...loadEmailEnvs(),
        mailMock: null,
      },
    });

    const from = sendMailService.makeFrom();

    const params = {
      to: 'test@test.com',
      subject: 'Test',
      html: 'test',
      from,
    };

    await sendMailService.send(params);

    expect(mailerService.sendMail).toHaveBeenCalledWith(params);
  });
});
