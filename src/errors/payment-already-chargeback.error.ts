import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class PaymentAlreadyChargebacked extends BaseError {
  constructor(messageError: string) {
    super(HttpStatus.BAD_REQUEST, 'PAYMENT_ALREADY_CHARGEBACKED', messageError);
  }
}
