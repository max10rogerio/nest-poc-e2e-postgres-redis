import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class PolicyCancelled extends BaseError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, 'POLICY_CANCELLED', 'Apólice cancelada!');
  }
}
