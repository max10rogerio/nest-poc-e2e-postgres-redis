import { Injectable } from '@nestjs/common';
import { PaymentBillingAttempContext } from 'src/modules/mail/contexts/payment-billing-attemp.context';
import { MailTemplates } from '../constants';
import { MailPublisher } from '../publishers';

@Injectable()
export class PaymentBillingAttempPublisher {
  constructor(private readonly mailPublisher: MailPublisher) {}

  async send(params: PaymentBillingAttempParams, receiver: string): Promise<void> {
    await this.mailPublisher.publish({
      template: MailTemplates.PaymentBillingAttemp,
      subject: 'Tentativa de cobrança',
      context: { ...params, titleHeader: 'Essa é uma cobrança mensal do seguro' },
      to: receiver,
    });
  }
}

export type PaymentBillingAttempParams = PaymentBillingAttempContext;
