import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseError extends HttpException {
  @ApiProperty({ description: 'Código do erro' })
  type: string;

  @ApiProperty({ description: 'Descrição do erro' })
  message: string;

  @ApiProperty({ description: 'Objeto com informações adicionais' })
  metadata?: Record<string, any>;

  constructor(code: number, type: string, message?: string, metadata?: Record<string, any>) {
    super({ type, message, metadata }, code);

    this.type = type;
    this.message = message;
    this.metadata = metadata;
  }

  toJSON() {
    return {
      type: this.type,
      message: this.message,
      metadata: this.metadata,
    };
  }
}
