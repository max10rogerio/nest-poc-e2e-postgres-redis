import { HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ServerError } from 'src/errors';
import { PaymentAlreadyChargebacked } from 'src/errors/payment-already-chargeback.error';
import { LogPaymentTypeStatusEnum } from 'src/modules/common/constants';
import { handlePromise } from 'src/utils';
import { ChargebackErrorCodesEnum } from '../constants';
import {
  ChargebackPaymentRepository,
  GatewayChargebackResponse,
  PaymentLogRepository,
  SavePaymentRepository,
} from '../repositories';

@Injectable()
export class MakeChargebackPaymentService {
  constructor(
    private readonly chargebackPaymentRepository: ChargebackPaymentRepository,
    private readonly paymentLogRepository: PaymentLogRepository,
    private readonly savePaymentRepository: SavePaymentRepository,
  ) {}

  public async makeChargeBackPayment(params: MakeChargebackPaymentParams): Promise<number> {
    const chargebackReturn = await this.makeChargeBack(params);

    const idPayment = await this.savePaymentRepository.savePayment({
      cpf: params.cpf,
      idLog: chargebackReturn.idLog,
      value: 0,
      seqRelease: chargebackReturn.chargeback.seq_lanc,
      idLydians: chargebackReturn.chargeback.id,
    });

    return idPayment;
  }

  private async makeChargeBack(params: MakeChargebackPaymentParams): Promise<ChargebackReturn> {
    const [error, chargeback] = await handlePromise(
      this.chargebackPaymentRepository.chargebackPayment(params.financialPostingId),
      [],
    );
    const body = '"id" :' + params.financialPostingId;

    if (!error) {
      const idLog = await this.paymentLogRepository.saveLog({
        cpf: params.cpf,
        request: JSON.stringify(body),
        response: JSON.stringify(chargeback),
        statusCode: Number(chargeback.http_status),
        value: params.value,
        type: LogPaymentTypeStatusEnum.CHARGEBACK,
      });

      return { idLog, chargeback };
    }

    const axiosError = error as AxiosError;

    await this.paymentLogRepository.saveLog({
      cpf: params.cpf,
      request: JSON.stringify(body),
      response: JSON.stringify(axiosError?.response?.data),
      statusCode: Number(axiosError?.response?.status) || HttpStatus.INTERNAL_SERVER_ERROR,
      value: params.value,
      type: LogPaymentTypeStatusEnum.CHARGEBACK,
    });

    this.makeException(axiosError);
  }

  private makeException(error: AxiosError) {
    const code = error?.response?.data?.error?.Codigo;

    switch (code) {
      case ChargebackErrorCodesEnum.PAYMENT_ALREADY_CHARGEBACKED:
        throw new PaymentAlreadyChargebacked(error?.response?.data?.error?.Descricao);
      default:
        throw new ServerError(error?.message, 'Serviço indisponível no momento, por favor tente novamente.');
    }
  }
}

export type MakeChargebackPaymentParams = {
  cpf: string;
  financialPostingId: string;
  value: number;
};

type ChargebackReturn = {
  idLog: number;
  chargeback: GatewayChargebackResponse;
};
