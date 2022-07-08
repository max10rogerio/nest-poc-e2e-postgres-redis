import { PaymentsEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class GetPaymentRepositorySeeder extends SeederAbstract {
  paymentRepository: Repository<PaymentsEntity>;

  constructor() {
    super();
    this.paymentRepository = this.connection.getRepository(PaymentsEntity);
  }

  public async seed(): Promise<void> {
    this.disableConstraints(this.paymentRepository);

    await this.paymentRepository.save({
      cpf: '17949909099',
      idLydians: '98f36dd3-ab61-453b-9a10-ce045f9f43d0',
      value: 9,
      idLog: 1,
    });

    this.enableConstraints(this.paymentRepository);
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.paymentRepository.metadata.tableName);
  }
}
