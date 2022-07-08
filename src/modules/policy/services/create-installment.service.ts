import { Injectable } from '@nestjs/common';
import {
  CreateInstallmentRepository,
  CreateInstallmentRepositoryParams,
  CreateInstallmentRepositoryResponse,
} from '../repositories';

@Injectable()
export class CreateInstallmentService {
  constructor(private readonly createInstallmentRepository: CreateInstallmentRepository) {}

  public async createInstallment(params: CreateInstallmentServiceParams): Promise<CreateInstallmentServiceResponse> {
    const response: CreateInstallmentServiceResponse = [];

    const installments = Array.isArray(params) ? params : [params];

    for (const installment of installments) {
      const saveInstallment = await this.createInstallmentRepository.createInstallment(installment);
      response.push(saveInstallment);
    }

    return response;
  }
}

export type CreateInstallmentServiceParams = CreateInstallmentRepositoryParams | CreateInstallmentRepositoryParams[];
export type CreateInstallmentServiceResponse = CreateInstallmentRepositoryResponse[];
