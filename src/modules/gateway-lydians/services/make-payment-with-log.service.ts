import { HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { AccountNotFound, InsufficientFunds, ServerError } from 'src/errors';
import { handlePromise } from 'src/utils';
import { PaymentErrorCodesEnum } from '../constants';
import {
  GatewayPaymentResponse,
  MakePaymentRepository,
  MakePaymentRepositoryParams,
  PaymentLogRepository,
} from '../repositories';

@Injectable()
export class MakePaymentWithLogService {
  constructor(
    private readonly makePaymentRepository: MakePaymentRepository,
    private readonly paymentLogRepository: PaymentLogRepository,
  ) {}

  public async makePayment(params: MakePaymentRepositoryParams): Promise<MakePaymentWithLogResponse> {
    const [error, payment] = await handlePromise(this.makePaymentRepository.makePayment(params), []);
    const body = this.makePaymentRepository.makeBody(params);

    if (!error) {
      const idLog = await this.paymentLogRepository.saveLog({
        cpf: params.cpf,
        request: JSON.stringify(body),
        response: JSON.stringify(payment),
        statusCode: Number(payment.http_status),
        value: params.value,
      });

      return {
        idLog,
        payment,
      };
    }

    const axiosError = error as AxiosError;

    await this.paymentLogRepository.saveLog({
      cpf: params.cpf,
      request: JSON.stringify(body),
      response: JSON.stringify(axiosError),
      statusCode: Number(axiosError?.response?.status) || HttpStatus.INTERNAL_SERVER_ERROR,
      value: params.value,
    });

    this.makeException(axiosError);
  }

  private makeException(error: AxiosError) {
    const code = error?.response?.data?.error?.Codigo;

    switch (code) {
      case PaymentErrorCodesEnum.INSUFFICIENT_FUNDS:
        throw new InsufficientFunds();
      case PaymentErrorCodesEnum.ACCOUNT_NOT_FOUND:
        throw new AccountNotFound();
      default:
        throw new ServerError(error?.message, 'Serviço indisponível no momento, por favor tente novamente.');
    }
  }
}

export type MakePaymentWithLogResponse = {
  idLog: number;
  payment: GatewayPaymentResponse;
};
