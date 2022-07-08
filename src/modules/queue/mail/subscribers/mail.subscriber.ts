import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendEmailService } from 'src/modules/mail/services';
import { MailQueueEnum } from '../constants';

@Processor(MailQueueEnum.QUEUE_NAME)
export class MailSubscriber {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Process()
  public async subscribe(job: Job<ISendMailOptions>) {
    await this.sendEmailService.send(job.data);
  }
}
