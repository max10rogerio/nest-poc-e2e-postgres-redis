import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class CepNotFound extends BaseError {
  constructor(metadata?: any) {
    super(HttpStatus.NOT_FOUND, 'CEP_NOT_FOUND', metadata);
  }
}
