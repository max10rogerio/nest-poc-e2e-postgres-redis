import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { SendEmailService } from 'src/modules/mail/services';
import { MailQueueModule } from 'src/modules/queue/mail';
import { MailSubscriber } from 'src/modules/queue/mail/subscribers';

describe('MailSubscriber - unit', () => {
  let app: TestingModule;
  let mailSubscriber: MailSubscriber;
  let sendEMailService: SendEmailService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [MailQueueModule],
    }).compile();

    mailSubscriber = app.get<MailSubscriber>(MailSubscriber);
    sendEMailService = app.get<SendEmailService>(SendEmailService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be add a mail in queue', async () => {
    jest.spyOn(sendEMailService, 'send').mockImplementation(() => Promise.resolve({ id: 1 } as Job));

    const job: Job = { id: '1', data: { plan: 'test' } } as Job;
    await mailSubscriber.subscribe(job);

    expect(sendEMailService.send).toHaveBeenCalledWith(job.data);
  });
});
