import { InstallmentEntity } from 'src/modules/database/models';
import { InstallmentStatusEnum } from 'src/modules/policy/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class FindLastInstallmentPaidRepositorySeeder extends SeederAbstract {
  installmentRepository: Repository<InstallmentEntity>;

  constructor() {
    super();

    this.installmentRepository = this.connection.getRepository(InstallmentEntity);
  }

  public async seed(): Promise<void> {
    await this.disableConstraints(this.installmentRepository);

    await this.installmentRepository.save({
      account: '1',
      agency: '1',
      attempts: 1,
      paymentId: 1,
      iofValue: 1,
      totalValue: 1,
      liquidValue: 1,
      policyId: 1,
      dueDate: '2022-06-22',
      status: InstallmentStatusEnum.PAID,
      number: 1,
    });

    await this.installmentRepository.save({
      account: '1',
      agency: '1',
      attempts: 1,
      paymentId: 1,
      iofValue: 1,
      totalValue: 1,
      liquidValue: 1,
      policyId: 1,
      dueDate: '2022-07-22',
      status: InstallmentStatusEnum.PAID,
      number: 2,
    });

    await this.installmentRepository.save({
      account: '1',
      agency: '1',
      attempts: 1,
      paymentId: 1,
      iofValue: 1,
      totalValue: 1,
      liquidValue: 1,
      policyId: 1,
      dueDate: '2022-08-22',
      status: InstallmentStatusEnum.PENDING,
      number: 3,
    });

    await this.enableConstraints(this.installmentRepository);
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.installmentRepository.metadata.tableName);
  }
}
