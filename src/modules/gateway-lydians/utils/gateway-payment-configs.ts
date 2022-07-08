import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/config';

@Injectable()
export class GatewayPaymentConfigs {
  constructor(private readonly configService: ConfigService<Env>) {}

  public makeUrl(route: string, queryStringParams?: string): string {
    const { gateway_url } = this.getGatewayPaymentConfig();
    if (queryStringParams !== undefined) {
      return new URL(route + queryStringParams, gateway_url).toString();
    }
    return new URL(route, gateway_url).toString();
  }

  public getToken(): string {
    return this.getGatewayPaymentConfig().gateway_token;
  }

  public getGatewayPaymentConfig() {
    return this.configService.get<Env['gateway_payment']>('gateway_payment');
  }
}
