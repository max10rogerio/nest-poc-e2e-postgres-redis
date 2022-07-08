import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailModule } from 'src/modules/mail/mail.module';
import { MailQueueEnum } from './constants';
import {
  MailPublisher,
  PaymentBillingAttempPublisher,
  PolicyCancelPublisher,
  SendPolicyCancellationEmailPublisher,
} from './publishers';
import { MailSubscriber } from './subscribers';

@Module({
  imports: [
    BullModule.registerQueue({
      name: MailQueueEnum.QUEUE_NAME,
    }),
    MailModule,
  ],
  providers: [
    MailPublisher,
    MailSubscriber,
    SendPolicyCancellationEmailPublisher,
    PaymentBillingAttempPublisher,
    PolicyCancelPublisher,
  ],
  exports: [SendPolicyCancellationEmailPublisher, PaymentBillingAttempPublisher, PolicyCancelPublisher, MailPublisher],
})
export class MailQueueModule {}
