import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { Job, Queue } from 'bull';
import { MailPublisher, MailQueueModule } from 'src/modules/queue/mail';
import { MailQueueEnum, MailTemplates } from 'src/modules/queue/mail/constants';

describe('MailPublisher - unit', () => {
  let mailPublisher: MailPublisher;
  let app: TestingModule;
  let queue: Queue;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [MailQueueModule],
    }).compile();

    mailPublisher = app.get<MailPublisher>(MailPublisher);
    queue = app.get<Queue>(getQueueToken(MailQueueEnum.QUEUE_NAME));
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be add a mail in queue', async () => {
    jest.spyOn(queue, 'add').mockImplementation(() => Promise.resolve({ id: 1 } as Job));

    const paramsMock = { template: MailTemplates.SendRefoundEmail };
    await mailPublisher.publish(paramsMock);

    expect(queue.add).toHaveBeenCalledTimes(1);
    expect(queue.add).toHaveBeenCalledWith(paramsMock);
  });
});
