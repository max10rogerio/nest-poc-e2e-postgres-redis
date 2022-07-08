import { Injectable } from '@nestjs/common';
import { PolicyNotFound } from 'src/errors';
import { FindPolicyByIdRepository, FindPolicyByIdRepositoryResponse } from '../repositories';

@Injectable()
export class FindPolicyByIdService {
  constructor(private readonly findPolicyByIdRepository: FindPolicyByIdRepository) {}

  async findById(policyId: number): Promise<FindPolicyByIdServiceResponse> {
    const policy = await this.findPolicyByIdRepository.findById(policyId);

    if (!policy) throw new PolicyNotFound(policyId);

    return policy;
  }
}

export type FindPolicyByIdServiceResponse = FindPolicyByIdRepositoryResponse;
