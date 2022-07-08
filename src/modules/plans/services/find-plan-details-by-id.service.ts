import { Injectable } from '@nestjs/common';
import { PlanNotFound } from 'src/errors';
import { FindPlanDetailsByIdRepository, FindPlanDetailsByIdRepositoryResponse } from '../repositories';

@Injectable()
export class FindPlanDetailsByIdService {
  constructor(private readonly findPlanDetailsByIdRepository: FindPlanDetailsByIdRepository) {}

  public async findById(id: number): Promise<FindPlanDetailsByIdServiceResponse> {
    const plan = await this.findPlanDetailsByIdRepository.findById(id);

    if (!plan) throw new PlanNotFound(id);

    return plan;
  }
}

export type FindPlanDetailsByIdServiceResponse = FindPlanDetailsByIdRepositoryResponse;
