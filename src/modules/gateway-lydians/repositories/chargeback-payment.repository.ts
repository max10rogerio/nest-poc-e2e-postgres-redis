import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ROUTE_CHARGEBACK } from '../constants';
import { GatewayPaymentConfigs } from '../utils/gateway-payment-configs';

@Injectable()
export class ChargebackPaymentRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly gatewayPaymentConfigs: GatewayPaymentConfigs,
  ) {}

  public async chargebackPayment(financialPostingId: string): Promise<ChargebackPaymentRepositoryResponse> {
    const url = this.gatewayPaymentConfigs.makeUrl(ROUTE_CHARGEBACK, financialPostingId);
    const token = this.gatewayPaymentConfigs.getToken();
    const body = '';

    const observable = this.httpService.post<ChargebackPaymentRepositoryResponse>(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await firstValueFrom(observable);

    return data;
  }
}

export type ChargebackPaymentRepositoryResponse = GatewayChargebackResponse;

export type GatewayChargebackResponse = {
  request_id: string;
  application_name: string;
  http_status: string;
  response: Response;
  seq_lanc: number;
  account_number: number;
  agency_code: number;
  log_type: number;
  id: string;
  created_at: string;
  updated_at: string;
};

type Response = {
  SeqLanc: number;
  VersaoXML: number;
};
