import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class ServerError extends BaseError {
  constructor(metadata?: any, message = 'Erro Interno') {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'SERVER_ERROR', message, metadata);
  }
}
