import { Injectable } from '@nestjs/common';
import { CepNotFound } from 'src/errors';
import { FindCepRepository, FindCepRepositoryResponse } from '../repository';

@Injectable()
export class FindCepService {
  constructor(private readonly findCepRepository: FindCepRepository) {}

  public async find(cep: string): Promise<FindCepServiceResponse> {
    try {
      const result = await this.findCepRepository.find(cep);

      return result;
    } catch (error) {
      throw new CepNotFound(error);
    }
  }
}

export type FindCepServiceResponse = FindCepRepositoryResponse;
