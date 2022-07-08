import { Injectable } from '@nestjs/common';
import { InsuredNotFound } from 'src/errors';
import { FindInsuredByCPFRepository, FindInsuredByCPFRepositoryResponse } from '../repositories';

@Injectable()
export class FindInsuredByCPFService {
  constructor(private readonly findInsuredByCPFRepository: FindInsuredByCPFRepository) {}

  public async findByCPF(cpf: string): Promise<FindInsuredByCPFServiceResponse> {
    const insured = await this.findInsuredByCPFRepository.findByCPF(cpf);

    if (!insured) throw new InsuredNotFound(cpf);

    return insured;
  }
}

export type FindInsuredByCPFServiceResponse = FindInsuredByCPFRepositoryResponse;
