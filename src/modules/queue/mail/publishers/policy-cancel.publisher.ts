import { Injectable } from '@nestjs/common';
import { PolicyCancelContext } from 'src/modules/mail/contexts/policy-cancel.context';
import { MailTemplates } from '../constants';
import { MailPublisher } from '../publishers';

@Injectable()
export class PolicyCancelPublisher {
  constructor(private readonly mailPublisher: MailPublisher) {}

  async send(params: PolicyCancelParams, receiver: string): Promise<void> {
    await this.mailPublisher.publish({
      template: MailTemplates.PolicyCancel,
      subject: 'Cancelamento de seguro',
      context: { ...params, titleHeader: 'Infelizmente, seu seguro foi cancelado' },
      to: receiver,
    });
  }
}

export type PolicyCancelParams = PolicyCancelContext;
