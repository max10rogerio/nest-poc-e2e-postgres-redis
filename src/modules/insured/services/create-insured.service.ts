import { Injectable } from '@nestjs/common';
import {
  CreateInsuredRepository,
  CreateInsuredRepositoryParams,
  CreateInsuredRepositoryResponse,
} from '../repositories';

@Injectable()
export class CreateInsuredService {
  constructor(private readonly createInsuredRepository: CreateInsuredRepository) {}

  public async create(params: CreateInsuredServiceParams): Promise<CreateInsuredServiceResponse> {
    return this.createInsuredRepository.createInsured(params);
  }
}

export type CreateInsuredServiceParams = CreateInsuredRepositoryParams;
export type CreateInsuredServiceResponse = CreateInsuredRepositoryResponse;
