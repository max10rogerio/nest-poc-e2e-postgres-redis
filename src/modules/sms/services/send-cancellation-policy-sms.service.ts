import { Injectable } from '@nestjs/common';
import { makeInsuredFirstName } from '../utils';
import { SendSmsService } from './send-sms.service';

@Injectable()
export class SendCancellationPolicySmsService {
  constructor(private readonly sendSmsService: SendSmsService) {}

  public async send(params: SendCancellationPolicySmsServiceParams): Promise<void> {
    await this.sendSmsService.send({
      phoneNumber: params.phoneNumber,
      message: this.makeMessage(params.insuredName),
    });
  }

  private makeMessage(insuredName: string): string {
    const firstName = makeInsuredFirstName(insuredName);
    return `Oi ${firstName}! Infelizmente não conseguimos realizar a cobrança do seguro em sua conta. Por isso, ele foi cancelado automaticamente. Att, Seguros Gazin Bank.`;
  }
}

export type SendCancellationPolicySmsServiceParams = {
  phoneNumber: string;
  insuredName: string;
};
