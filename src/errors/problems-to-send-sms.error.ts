import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class ProblemsToSendSms extends BaseError {
  constructor(error: any) {
    super(HttpStatus.BAD_REQUEST, 'PROBLEMS_TO_SEND_SMS', 'Erro ao enviar o sms', error);
  }
}
