import { LogPaymentsEntity } from 'src/modules/database/models/log-payments.entity';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class PaymentLogRepositorySeeder extends SeederAbstract {
  logPayments: Repository<LogPaymentsEntity>;

  constructor() {
    super();
    this.logPayments = this.connection.getRepository(LogPaymentsEntity);
  }

  public async seed(): Promise<void> {
    return;
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.logPayments.metadata.tableName);
  }

  public async getFirstLog(): Promise<LogPaymentsEntity> {
    return this.logPayments.findOne();
  }
}
export const logToSave = {
  cpf: '18474412030',
  value: 19.9,
  request: '',
  response: '',
  statusCode: 200,
};
