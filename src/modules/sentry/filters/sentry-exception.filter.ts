import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Request, Response } from 'express';

@Catch()
export class SentryHttpExceptionFilter implements ExceptionFilter {
  constructor(
    @InjectSentry()
    private readonly sentryService: SentryService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
    const responseValue = exception.getResponse?.() || 'Internal Server error';

    this.sentryService.instance().captureException(JSON.stringify(responseValue), (scope) => {
      scope.setExtras({
        exception: this.stringifyObj(exception),
        request: this.stringifyObj(this.castRequestToString(request)),
        response: this.stringifyObj(responseValue),
      });

      return scope;
    });

    return response.status(status).json(responseValue);
  }

  private castRequestToString(request: Request) {
    const obj = {
      body: request?.body,
      query: request?.query,
      headers: request?.headers,
      params: request?.params,
    };

    return obj;
  }

  private stringifyObj(obj: any) {
    return JSON.stringify(obj, null, 2);
  }
}
