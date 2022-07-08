import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { SendSmsRepository } from './repositories';
import { SendCancellationPolicySmsService, SendPaymentBillingChargeSmsService, SendSmsService } from './services';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [SendSmsRepository, SendSmsService, SendCancellationPolicySmsService, SendPaymentBillingChargeSmsService],
  exports: [SendSmsService, SendCancellationPolicySmsService, SendPaymentBillingChargeSmsService],
})
export class SmsModule {}
