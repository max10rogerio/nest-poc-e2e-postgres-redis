import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class AccountNotFound extends BaseError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, 'ACCOUNT_NOT_FOUND', 'Conta não localizada.');
  }
}
