import { HttpStatus } from '@nestjs/common';
import { BaseError } from './base.error';

export class ResidentialParamsRequired extends BaseError {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      'RESIDENTIAL_PARAMS_REQUIRED',
      'Os parametros residenciais para este tipo de seguro são obrigatórios.',
    );
  }
}
