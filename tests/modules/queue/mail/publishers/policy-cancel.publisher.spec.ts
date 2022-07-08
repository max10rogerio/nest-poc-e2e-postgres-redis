import { Test, TestingModule } from '@nestjs/testing';
import { MailPublisher, MailQueueModule, PolicyCancelPublisher } from 'src/modules/queue/mail';
import { MailTemplates } from 'src/modules/queue/mail/constants';

describe('PolicyCancelPublisher - unit', () => {
  let app: TestingModule;
  let policyCancelPublisher: PolicyCancelPublisher;
  let mailPublisher: MailPublisher;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [MailQueueModule],
    }).compile();

    policyCancelPublisher = app.get<PolicyCancelPublisher>(PolicyCancelPublisher);
    mailPublisher = app.get<MailPublisher>(MailPublisher);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be add a mail in queue', async () => {
    jest.spyOn(mailPublisher, 'publish').mockImplementation(() => Promise.resolve());
    const paramsMock = {
      titleHeader: 'Infelizmente, seu seguro foi cancelado',
      ticketNumber: '123123123',
    };
    await policyCancelPublisher.send(paramsMock, 'teste@teste.com');

    expect(mailPublisher.publish).toHaveBeenCalledTimes(1);
    expect(mailPublisher.publish).toHaveBeenCalledWith({
      context: paramsMock,
      template: MailTemplates.PolicyCancel,
      subject: 'Cancelamento de seguro',
      to: 'teste@teste.com',
    });
  });
});
