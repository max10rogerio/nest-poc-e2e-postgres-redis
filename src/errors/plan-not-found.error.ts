import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class PlanNotFound extends BaseError {
  constructor(id: number) {
    super(HttpStatus.NOT_FOUND, 'PLAN_NOT_FOUND', `Plano não encontrado com o id: ${id}`);
  }
}
