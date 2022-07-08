import { ISendMailOptions } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { MailQueueEnum, MailTemplates } from '../constants';

@Injectable()
export class MailPublisher {
  constructor(
    @InjectQueue(MailQueueEnum.QUEUE_NAME)
    private readonly mailQueue: Queue,
  ) {}

  public async publish(params: MailOptionsParams): Promise<void> {
    await this.mailQueue.add(params);
  }
}

export type MailOptionsParams = ISendMailOptions & {
  template: MailTemplates;
};
