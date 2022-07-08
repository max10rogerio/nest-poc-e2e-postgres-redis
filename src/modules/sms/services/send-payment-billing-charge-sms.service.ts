import { Injectable } from '@nestjs/common';
import { makeInsuredFirstName } from '../utils';
import { SendSmsService } from './send-sms.service';

@Injectable()
export class SendPaymentBillingChargeSmsService {
  constructor(private readonly sendSmsService: SendSmsService) {}

  public async send(params: SendPaymentBillingChargeSmsServiceParams): Promise<void> {
    await this.sendSmsService.send({
      phoneNumber: params.phoneNumber,
      message: this.makeMessage(params.insuredName),
    });
  }

  private makeMessage(insuredName: string): string {
    const firstName = makeInsuredFirstName(insuredName);
    return `Oi ${firstName}! Tentamos debitar a sua parcela do seguro, mas não deu certo. Verifique sua conta e mais tarde tentaremos de novo! Att, Seguros Gazin Bank.`;
  }
}

export type SendPaymentBillingChargeSmsServiceParams = {
  insuredName: string;
  phoneNumber: string;
};
