import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstallmentEntity, PolicyEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class FindPolicyByIdRepository {
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly policyRepository: Repository<PolicyEntity>,
    @InjectRepository(InstallmentEntity)
    private readonly installmentRepository: Repository<InstallmentEntity>,
  ) {}

  public async findById(policyId: number): Promise<FindPolicyByIdRepositoryResponse> {
    const policy = await this.policyRepository
      .createQueryBuilder('policy')
      .select()
      .innerJoinAndSelect('policy.plan', 'plan')
      .innerJoinAndSelect('plan.product', 'product')
      .innerJoinAndSelect('policy.insured', 'insured')
      .where('policy.id = :id', { id: policyId })
      .getOne();

    if (!policy) return null;

    const installment = await this.installmentRepository
      .createQueryBuilder('installment')
      .select()
      .where('installment.policyId = :id', { id: policyId })
      .andWhere('installment.number = 1')
      .getOne();

    return { ...policy, installment } as FindPolicyByIdRepositoryResponse;
  }
}

export type FindPolicyByIdRepositoryResponse = PolicyEntity & { installment: InstallmentEntity };
