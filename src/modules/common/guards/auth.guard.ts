import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { InvalidToken } from 'src/errors';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

type Request = {
  headers: {
    authorization?: string;
  };
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers.authorization || null;

    try {
      const api_bank = this.configService.get('api_bank');

      const requestConfig: AxiosRequestConfig = {
        headers: {
          authorization: token,
          identificador: api_bank.identification,
        },
      };

      const url = new URL(api_bank.token_url, api_bank.base_url);

      await firstValueFrom(this.httpService.get(url.href, requestConfig));
    } catch (error) {
      throw new InvalidToken();
    }

    return true;
  }
}
