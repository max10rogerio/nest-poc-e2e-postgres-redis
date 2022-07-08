import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstallmentEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';
import { InstallmentStatusEnum } from '../constants';

@Injectable()
export class CancelInstallmentRepository {
  constructor(
    @InjectRepository(InstallmentEntity)
    private readonly installmentRepository: Repository<InstallmentEntity>,
  ) {}

  public async cancelInstallmentWithChargeback(policyId: number) {
    await this.installmentRepository
      .createQueryBuilder('installment')
      .update<InstallmentEntity>(InstallmentEntity, { status: InstallmentStatusEnum.CHARGEBACKED })
      .where('policyId = :policyId', { policyId })
      .andWhere('number = 1')
      .execute();

    await this.installmentRepository
      .createQueryBuilder('installment')
      .update<InstallmentEntity>(InstallmentEntity, { status: InstallmentStatusEnum.CANCELED })
      .where('policyId = :policyId', { policyId })
      .andWhere('number != 1')
      .execute();
  }
  public async cancelInstallmentNoChargeback(policyId: number) {
    await this.installmentRepository
      .createQueryBuilder('installment')
      .update<InstallmentEntity>(InstallmentEntity, { status: InstallmentStatusEnum.CANCELED })
      .where('policyId = :policyId', { policyId })
      .andWhere({ status: InstallmentStatusEnum.PENDING })
      .execute();
  }
}
