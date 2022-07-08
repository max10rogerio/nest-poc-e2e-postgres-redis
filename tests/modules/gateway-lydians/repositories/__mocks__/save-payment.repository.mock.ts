import { LogPaymentsEntity } from 'src/modules/database/models/log-payments.entity';
import { PaymentsEntity } from 'src/modules/database/models/payments.entity';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class SavePaymentRepositorySeeder extends SeederAbstract {
  payment: Repository<PaymentsEntity>;
  logPayments: Repository<LogPaymentsEntity>;

  constructor() {
    super();

    this.payment = this.connection.getRepository(PaymentsEntity);
    this.logPayments = this.connection.getRepository(LogPaymentsEntity);
  }

  public async seed(): Promise<void> {
    return;
  }

  public async getDataToSave() {
    const log = await this.logPayments.save({
      cpf: '18474412030',
      value: 19.9,
      request: '',
      response: '',
      statusCode: 200,
    });

    return {
      idLog: log.id,
      cpf: '18474412030',
      value: 19.9,
      seqRelease: 1,
      idLydians: 'c890e653-7bfa-43fc-a481-dc422fc14082',
    };
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.logPayments.metadata.tableName);
    await this.truncateTable(this.payment.metadata.tableName);
  }

  public async getFirstPayment(): Promise<PaymentsEntity> {
    return this.payment.findOne();
  }
}
