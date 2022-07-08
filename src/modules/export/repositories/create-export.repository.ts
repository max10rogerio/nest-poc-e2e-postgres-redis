import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/modules/common/constants';
import { ExportEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';
import { ExportTypeEnum } from '../constants';

@Injectable()
export class CreateExportRepository {
  constructor(
    @InjectRepository(ExportEntity)
    private readonly exportRepository: Repository<ExportEntity>,
  ) {}

  public async createExport(params: CreateExportRepositoryParams): Promise<CreateExportRepositoryResponse> {
    const newExported = await this.exportRepository.save({
      type: params.type,
      log: params.log,
      file: params.file,
      status: params.status,
    });

    return newExported;
  }
}

type Export = {
  type: ExportTypeEnum;
  log: string;
  file: string;
  status: StatusEnum;
};

export type CreateExportRepositoryParams = Export;
export type CreateExportRepositoryResponse = ExportEntity;
