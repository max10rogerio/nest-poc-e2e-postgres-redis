import { Injectable } from '@nestjs/common';
import { SavePaymentRepository } from '../repositories/save-payment.repository';
import { MakePaymentWithLogService } from './make-payment-with-log.service';

@Injectable()
export class MakePaymentService {
  constructor(
    private readonly makePaymentWithLog: MakePaymentWithLogService,
    private readonly savePaymentRepository: SavePaymentRepository,
  ) {}

  public async makePayment(request: MakePaymentServiceParams): Promise<MakePaymentServiceResponse> {
    const { idLog: logId, payment } = await this.makePaymentWithLog.makePayment(request);

    const paymentId = await this.savePaymentRepository.savePayment({
      cpf: request.cpf,
      idLog: logId,
      value: request.value,
      seqRelease: payment.seq_lanc,
      idLydians: payment.id,
    });

    return {
      logId,
      paymentId,
      requestId: payment.request_id,
      transactionId: payment.seq_lanc,
    };
  }
}

export type MakePaymentServiceParams = {
  agency_code: number;
  account_number: number;
  value: number;
  description: string;
  cpf: string;
};

export type MakePaymentServiceResponse = {
  paymentId: number;
  logId: number;
  transactionId: number;
  requestId: string;
};
