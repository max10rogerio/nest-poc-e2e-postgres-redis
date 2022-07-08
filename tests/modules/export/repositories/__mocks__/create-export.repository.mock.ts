import { StatusEnum } from 'src/modules/common/constants';
import { ExportEntity } from 'src/modules/database/models';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { CreateExportRepositoryParams } from 'src/modules/export/repositories';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class CreateExportRepositorySeeder extends SeederAbstract {
  exportRepository: Repository<ExportEntity>;

  constructor() {
    super();

    this.exportRepository = this.connection.getRepository(ExportEntity);
  }

  public async seed(): Promise<void> {
    await this.truncateTable(this.exportRepository.metadata.tableName);
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.exportRepository.metadata.tableName);
  }

  public async exportExpected(): Promise<ExportEntity> {
    return this.exportRepository.findOne();
  }
}

export const params: CreateExportRepositoryParams = {
  file: 'teste.txt',
  log: 'log text',
  status: StatusEnum.SUCCESS,
  type: ExportTypeEnum.DIH,
};
