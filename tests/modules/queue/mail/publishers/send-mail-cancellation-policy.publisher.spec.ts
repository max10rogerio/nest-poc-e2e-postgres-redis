import { Test, TestingModule } from '@nestjs/testing';
import { MailPublisher, MailQueueModule, SendPolicyCancellationEmailPublisher } from 'src/modules/queue/mail';
import { MailTemplates } from 'src/modules/queue/mail/constants';

describe('SendPolicyCancellationEmailPublisher - unit', () => {
  let app: TestingModule;
  let sendPolicyCancellationEmailPublisher: SendPolicyCancellationEmailPublisher;
  let mailPublisher: MailPublisher;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [MailQueueModule],
    }).compile();

    sendPolicyCancellationEmailPublisher = app.get<SendPolicyCancellationEmailPublisher>(
      SendPolicyCancellationEmailPublisher,
    );
    mailPublisher = app.get<MailPublisher>(MailPublisher);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be add a mail in queue', async () => {
    jest.spyOn(mailPublisher, 'publish').mockImplementation(() => Promise.resolve());
    const paramsMock = {
      titleHeader: 'Estorno de pagamento de seguro foi realizado',
      ticketNumber: '123123',
      name: 'Name teste',
      insurance: 'insurance test',
      cancellationDate: new Date(),
    };
    await sendPolicyCancellationEmailPublisher.send(paramsMock);

    expect(mailPublisher.publish).toHaveBeenCalledTimes(1);
    expect(mailPublisher.publish).toHaveBeenCalledWith({
      context: paramsMock,
      template: MailTemplates.SendRefoundEmail,
      subject: 'Estorno de pagamento',
      to: 'gazinseguros@gazin.com.br',
    });
  });
});
