import { Injectable } from '@nestjs/common';
import { SendRefoundMailCancelationContext } from 'src/modules/mail/contexts/send-refound-email.context';
import { MailTemplates } from '../constants';
import { MailPublisher } from '../publishers';

@Injectable()
export class SendPolicyCancellationEmailPublisher {
  constructor(private readonly mailPublisher: MailPublisher) {}

  async send(params: SendPolicyCancellationEmailParams): Promise<void> {
    await this.mailPublisher.publish({
      template: MailTemplates.SendRefoundEmail,
      subject: 'Estorno de pagamento',
      context: { ...params, titleHeader: 'Estorno de pagamento de seguro foi realizado' },
      to: 'gazinseguros@gazin.com.br',
    });
  }
}

export type SendPolicyCancellationEmailParams = SendRefoundMailCancelationContext;
