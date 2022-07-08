import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class InsufficientFunds extends BaseError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, 'INSUFFICIENT_FUNDS', 'Saldo insuficiente na conta bancária.');
  }
}
