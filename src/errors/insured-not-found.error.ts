import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class InsuredNotFound extends BaseError {
  constructor(cpf: string) {
    super(HttpStatus.NOT_FOUND, 'INSURED_NOT_FOUND', `Insured not found with cpf: ${cpf}`);
  }
}
