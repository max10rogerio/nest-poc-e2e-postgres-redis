import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogPaymentTypeStatusEnum } from 'src/modules/common/constants';
import { LogPaymentsEntity } from 'src/modules/database/models/log-payments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentLogRepository {
  constructor(
    @InjectRepository(LogPaymentsEntity)
    private readonly logPaymentRepository: Repository<LogPaymentsEntity>,
  ) {}

  public async saveLog(paymentLog: PaymentLogRepositoryParams): Promise<number> {
    const log = await this.logPaymentRepository.save(paymentLog);

    return log.id;
  }
}

export type PaymentLogRepositoryParams = {
  cpf: string;
  value: number;
  statusCode: number;
  request: string;
  response: string;
  type?: LogPaymentTypeStatusEnum;
};
