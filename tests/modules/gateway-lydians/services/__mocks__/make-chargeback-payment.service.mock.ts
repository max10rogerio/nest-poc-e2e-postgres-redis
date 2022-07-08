import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ChargebackErrorCodesEnum } from 'src/modules/gateway-lydians/constants';
import { BodyRequest, ChargebackPaymentRepositoryResponse } from 'src/modules/gateway-lydians/repositories';
import { MakeChargebackPaymentParams } from 'src/modules/gateway-lydians/services';

export const idLog = 1;
export const idPayment = 1;

export const request: MakeChargebackPaymentParams = {
  cpf: '38128173065',
  financialPostingId: '81c1ec4b-d72c-40a6-a14b-877fa06dd29a',
  value: 9.9,
};

export const bodyResponse: BodyRequest = {
  CodAgencia: 1,
  NroConta: 1,
  CodHist: 201,
  CodOperCP: 1,
  DscLanc: 'successful launch',
  TimeOut: 25,
  VlrLanc: 9.9,
};

export const response: ChargebackPaymentRepositoryResponse = {
  request_id: '81c1ec4b-d72c-40a6-a14b-877fa06dd29a',
  application_name: 'API Seguros',
  http_status: '200',
  response: undefined,
  seq_lanc: 10,
  id: '50c05630-7193-42af-865d-f4909b7b782a',
  created_at: undefined,
  updated_at: undefined,
  account_number: 1,
  agency_code: 1,
  log_type: 1,
};

export const errorAlreadyChargebacked: AxiosError = {
  response: {
    data: {
      error: {
        Codigo: ChargebackErrorCodesEnum.PAYMENT_ALREADY_CHARGEBACKED,
        Descricao: 'Lançamento já estornado! Lançamento 310.',
      },
    },
    status: HttpStatus.BAD_REQUEST,
  },
} as AxiosError;
