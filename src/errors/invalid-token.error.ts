import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class InvalidToken extends BaseError {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, 'INVALID_TOKEN', 'Token inválido');
  }
}
