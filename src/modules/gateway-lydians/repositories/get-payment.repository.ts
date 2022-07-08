import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsEntity } from 'src/modules/database/models/payments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetPaymentRepository {
  constructor(
    @InjectRepository(PaymentsEntity)
    private readonly paymentRepository: Repository<PaymentsEntity>,
  ) {}

  public async getPaymentByInstallment(installmentId: number): Promise<PaymentsEntity> {
    return await this.paymentRepository.findOne({ id: installmentId });
  }
}
