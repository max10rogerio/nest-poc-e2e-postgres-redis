import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsEntity } from 'src/modules/database/models/payments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SavePaymentRepository {
  constructor(
    @InjectRepository(PaymentsEntity)
    private readonly paymentRepository: Repository<PaymentsEntity>,
  ) {}

  public async savePayment(paymentData: SavePaymentRepositoryParams): Promise<number> {
    const payment = await this.paymentRepository.save(paymentData);

    return payment.id;
  }
}

export type SavePaymentRepositoryParams = {
  cpf: string;
  value: number;
  idLog: number;
  seqRelease: number;
  idLydians: string;
};
