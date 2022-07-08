import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstallmentEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';
import { InstallmentStatusEnum } from '../constants';

@Injectable()
export class FindLastInstallmentPaidRepository {
  constructor(
    @InjectRepository(InstallmentEntity)
    private readonly installmentRepository: Repository<InstallmentEntity>,
  ) {}

  public async findByPolicyId(policyId: number): Promise<FindLastInstallmentPaidRepositoryResponse> {
    return await this.installmentRepository
      .createQueryBuilder('installment')
      .select()
      .where('installment.policyId = :id', { id: policyId })
      .andWhere('installment.status = :status', { status: InstallmentStatusEnum.PAID })
      .orderBy('installment.number', 'DESC')
      .getOne();
  }
}

export type FindLastInstallmentPaidRepositoryResponse = InstallmentEntity;
