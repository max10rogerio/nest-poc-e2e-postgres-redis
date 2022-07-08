import { Injectable } from '@nestjs/common';
import { ProblemsToSendSms } from 'src/errors';
import { SendSmsRepository, SendSmsRepositoryParams } from '../repositories';

@Injectable()
export class SendSmsService {
  constructor(private readonly sendSmsRepository: SendSmsRepository) {}

  public async send(params: SendSmsServiceParams): Promise<void> {
    try {
      await this.sendSmsRepository.send(params);
    } catch (error) {
      throw new ProblemsToSendSms(error);
    }
  }
}

export type SendSmsServiceParams = SendSmsRepositoryParams;
