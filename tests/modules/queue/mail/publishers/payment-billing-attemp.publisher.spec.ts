import { Test, TestingModule } from '@nestjs/testing';
import { MailPublisher, MailQueueModule, PaymentBillingAttempPublisher } from 'src/modules/queue/mail';
import { MailTemplates } from 'src/modules/queue/mail/constants';

describe('PaymentBillingAttempPublisher - unit', () => {
  let app: TestingModule;
  let paymentBillingAttempPublisher: PaymentBillingAttempPublisher;
  let mailPublisher: MailPublisher;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [MailQueueModule],
    }).compile();

    paymentBillingAttempPublisher = app.get<PaymentBillingAttempPublisher>(PaymentBillingAttempPublisher);
    mailPublisher = app.get<MailPublisher>(MailPublisher);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be add a mail in queue', async () => {
    jest.spyOn(mailPublisher, 'publish').mockImplementation(() => Promise.resolve());
    const paramsMock = {
      titleHeader: 'Essa é uma cobrança mensal do seguro',
      installmentValue: '9.99',
      ticketNumber: '123123123',
    };
    await paymentBillingAttempPublisher.send(paramsMock, 'teste@teste.com');

    expect(mailPublisher.publish).toHaveBeenCalledTimes(1);
    expect(mailPublisher.publish).toHaveBeenCalledWith({
      context: paramsMock,
      subject: 'Tentativa de cobrança',
      template: MailTemplates.PaymentBillingAttemp,
      to: 'teste@teste.com',
    });
  });
});
