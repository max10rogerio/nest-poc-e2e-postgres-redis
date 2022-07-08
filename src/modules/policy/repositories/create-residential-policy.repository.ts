import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicyResidentialEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class CreateResidentialPolicyRepository {
  constructor(
    @InjectRepository(PolicyResidentialEntity)
    private readonly policyResidentialRepository: Repository<PolicyResidentialEntity>,
  ) {}

  public async create(
    params: CreateResidentialPolicyRepositoryParams,
  ): Promise<CreateResidentialPolicyRepositoryResponse> {
    return this.policyResidentialRepository.save(params);
  }
}

export type CreateResidentialPolicyRepositoryParams = Partial<PolicyResidentialEntity>;
export type CreateResidentialPolicyRepositoryResponse = PolicyResidentialEntity;
