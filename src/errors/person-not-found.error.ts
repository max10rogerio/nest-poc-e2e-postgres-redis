import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class PersonNotFound extends BaseError {
  constructor(cpf: string) {
    super(HttpStatus.NOT_FOUND, 'PERSON_NOT_FOUND', `Pessoa não encontrada com o cpf: ${cpf}`);
  }
}
