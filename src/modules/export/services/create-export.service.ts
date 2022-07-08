import { Injectable } from '@nestjs/common';
import { CreateExportRepository, CreateExportRepositoryParams, CreateExportRepositoryResponse } from '../repositories';

@Injectable()
export class CreateExportService {
  constructor(private readonly createExportRepository: CreateExportRepository) {}

  public async createExport(params: CreateExportServiceParams): Promise<CreateExportServiceResponse> {
    return this.createExportRepository.createExport(params);
  }
}

export type CreateExportServiceParams = CreateExportRepositoryParams;
export type CreateExportServiceResponse = CreateExportRepositoryResponse;
