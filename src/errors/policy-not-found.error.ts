import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class PolicyNotFound extends BaseError {
  constructor(id: number) {
    super(HttpStatus.NOT_FOUND, 'POLICY_NOT_FOUND', `Apólice não encontrada com o id: ${id}`);
  }
}
