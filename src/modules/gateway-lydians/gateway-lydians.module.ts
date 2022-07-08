import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogPaymentsEntity } from '../database/models/log-payments.entity';
import { PaymentsEntity } from '../database/models/payments.entity';
import { ChargebackPaymentRepository, GetPaymentRepository, MakePaymentRepository } from './repositories';
import { PaymentLogRepository } from './repositories/payment-log.repository';
import { SavePaymentRepository } from './repositories/save-payment.repository';
import { MakePaymentService } from './services';
import { MakeChargebackPaymentService } from './services/make-chargeback-payment.service';
import { MakePaymentWithLogService } from './services/make-payment-with-log.service';
import { GatewayPaymentConfigs } from './utils/gateway-payment-configs';

@Module({
  providers: [
    MakePaymentRepository,
    PaymentLogRepository,
    SavePaymentRepository,
    MakePaymentService,
    MakePaymentWithLogService,
    ChargebackPaymentRepository,
    GatewayPaymentConfigs,
    MakeChargebackPaymentService,
    GetPaymentRepository,
  ],
  imports: [HttpModule, TypeOrmModule.forFeature([LogPaymentsEntity, PaymentsEntity])],
  exports: [MakePaymentRepository, MakePaymentService, MakeChargebackPaymentService, GetPaymentRepository],
})
export class GatewayLydiansModule {}
