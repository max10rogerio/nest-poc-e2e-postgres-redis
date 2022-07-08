import { Injectable } from '@nestjs/common';
import { FindInsuredPoliciesRepository, FindInsuredPoliciesRepositoryResponse } from '../repositories';

@Injectable()
export class FindInsuredPoliciesService {
  constructor(private readonly findInsuredPoliciesRepository: FindInsuredPoliciesRepository) {}

  async find(cpf: string): Promise<FindInsuredPoliciesServiceResponse> {
    return this.findInsuredPoliciesRepository.findByCPF(cpf);
  }
}

export type FindInsuredPoliciesServiceResponse = FindInsuredPoliciesRepositoryResponse;
