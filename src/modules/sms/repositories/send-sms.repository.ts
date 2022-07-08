import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Env } from 'src/config';

@Injectable()
export class SendSmsRepository {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService<Env>) {}

  public async send(params: SendSmsRepositoryParams): Promise<SendSmsRepositoryResponse> {
    const observable = this.httpService.post<HttpResponse>(this.makeURL(), this.makeBody(params));

    const { data } = await firstValueFrom(observable);

    return data;
  }

  private makeURL() {
    return this.configService.get<Env['sms']>('sms').url;
  }

  private makeBody(params: SendSmsRepositoryParams): HttpBody {
    const credentials = this.configService.get<Env['sms']>('sms');

    return {
      envios: {
        TOKEN: '',
        USUARIO: credentials.user,
        SENHA: credentials.password,
        TIPO_ROTA: 'PREMIO',
        UNE: '',
        GRUPO: '',
        SUBGRUPO: '',
        TELEFONES: [
          {
            TELEFONE: params.phoneNumber,
            MENSAGEM: params.message,
            MSGID: '1',
          },
        ],
      },
    };
  }
}

export type SendSmsRepositoryParams = {
  message: string;
  phoneNumber: string;
};

export type SendSmsRepositoryResponse = HttpResponse;

type HttpBody = {
  envios: {
    TOKEN: string;
    USUARIO: string;
    SENHA: string;
    TIPO_ROTA: string;
    UNE: string;
    GRUPO: string;
    SUBGRUPO: string;
    TELEFONES: {
      TELEFONE: string;
      MENSAGEM: string;
      MSGID: string;
    }[];
  };
};

type HttpResponse = {
  d: {
    type: string;
    ID_SMS: string;
    STATUS: string;
    MSGID: string;
    TELEFONE: string;
    DESCRICAO: string;
    RESPOSTA?: any;
    DATA_ENVIO: string;
    DATA_RESPOSTA?: any;
  }[];
};
