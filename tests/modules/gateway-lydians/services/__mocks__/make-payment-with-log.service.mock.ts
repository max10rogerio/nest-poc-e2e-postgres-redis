import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { PaymentErrorCodesEnum } from 'src/modules/gateway-lydians/constants';
import { BodyRequest, MakePaymentRepositoryResponse } from 'src/modules/gateway-lydians/repositories';
import { MakePaymentServiceParams } from 'src/modules/gateway-lydians/services';

export const idLog = 1;

export const paymentRequest: MakePaymentServiceParams = {
  agency_code: 1,
  account_number: 1,
  cpf: '93098756071',
  description: 'Payment Success',
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

export const makePaymentResponse: MakePaymentRepositoryResponse = {
  request_id: '81c1ec4b-d72c-40a6-a14b-877fa06dd29a',
  application_name: 'API Seguros',
  http_status: '200',
  response: undefined,
  seq_lanc: 10,
  id: '50c05630-7193-42af-865d-f4909b7b782a',
  created_at: undefined,
  updated_at: undefined,
};

export const errorInsufficientFunds: AxiosError = {
  response: {
    data: {
      error: {
        Codigo: PaymentErrorCodesEnum.INSUFFICIENT_FUNDS,
      },
    },
    status: HttpStatus.BAD_REQUEST,
  },
} as AxiosError;

export const errorAccountNotFound: AxiosError = {
  response: {
    data: {
      error: {
        Codigo: PaymentErrorCodesEnum.ACCOUNT_NOT_FOUND,
      },
    },
    status: HttpStatus.BAD_REQUEST,
  },
} as AxiosError;
