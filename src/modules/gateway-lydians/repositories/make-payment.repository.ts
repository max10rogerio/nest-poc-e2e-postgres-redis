import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ROUTE_PAYMENT } from '../constants';
import { GatewayPaymentConfigs } from '../utils/gateway-payment-configs';

@Injectable()
export class MakePaymentRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly gatewayPaymentConfigs: GatewayPaymentConfigs,
  ) {}

  public async makePayment(request: MakePaymentRepositoryParams): Promise<MakePaymentRepositoryResponse> {
    const url = this.gatewayPaymentConfigs.makeUrl(ROUTE_PAYMENT);
    const token = this.gatewayPaymentConfigs.getToken();
    const body = this.makeBody(request);

    const observable = this.httpService.post<GatewayPaymentResponse>(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await firstValueFrom(observable);

    return data;
  }

  public makeBody(request: MakePaymentRepositoryParams): BodyRequest {
    const gatewayPaymentConfig = this.gatewayPaymentConfigs.getGatewayPaymentConfig();
    return {
      TimeOut: gatewayPaymentConfig.gateway_timeout,
      CodAgencia: request.agency_code,
      NroConta: request.account_number,
      CodHist: gatewayPaymentConfig.gateway_cod_hist,
      VlrLanc: request.value,
      DscLanc: request.description,
      CodOperCP: gatewayPaymentConfig.gateway_cod_oper_cp,
    };
  }
}

export type MakePaymentRepositoryResponse = GatewayPaymentResponse;

export type MakePaymentRepositoryParams = {
  agency_code: number;
  account_number: number;
  value: number;
  description: string;
  cpf: string;
};

export type GatewayPaymentResponse = {
  request_id: string;
  application_name: string;
  http_status: string;
  response: Response;
  seq_lanc: number;
  id: string;
  created_at: string;
  updated_at: string;
};

export type Response = {
  SeqLanc: number;
  VersaoXML: number;
};

export type BodyRequest = {
  TimeOut: number;
  CodAgencia: number;
  NroConta: number;
  CodHist: number;
  VlrLanc: number;
  DscLanc: string;
  CodOperCP: number;
};
