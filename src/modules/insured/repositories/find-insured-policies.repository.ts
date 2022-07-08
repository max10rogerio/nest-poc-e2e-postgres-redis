import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { PolicyEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class FindInsuredPoliciesRepository {
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly policyRepository: Repository<PolicyEntity>,
  ) {}

  async findByCPF(cpf: string): Promise<FindInsuredPoliciesRepositoryResponse> {
    const builder = this.policyRepository
      .createQueryBuilder('policy')
      .select()
      .innerJoin('policy.insured', 'insured')
      .innerJoinAndSelect('policy.plan', 'plan')
      .innerJoinAndSelect('plan.product', 'product')
      .where('insured.cpf = :cpf', { cpf })
      .andWhere('policy.status = :status', { status: PolicyStatusEnum.ISSUED })
      .orderBy('policy.createdAt', 'ASC');

    return builder.getMany();
  }
}

export type FindInsuredPoliciesRepositoryResponse = PolicyEntity[];
