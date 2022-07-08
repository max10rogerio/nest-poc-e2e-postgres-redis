import { InstallmentEntity } from 'src/modules/database/models';
import { InstallmentStatusEnum } from 'src/modules/policy/constants';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class CancelInstallmentRepositorySeeder extends SeederAbstract {
  installmentRepository: Repository<InstallmentEntity>;

  constructor() {
    super();

    this.installmentRepository = this.connection.getRepository(InstallmentEntity);
  }

  public async seed(): Promise<any> {
    await this.disableConstraints(this.installmentRepository);
  }

  public async seedInstallments(): Promise<number> {
    const policyId = 1;

    await this.disableConstraints(this.installmentRepository);

    await this.installmentRepository.save({
      status: InstallmentStatusEnum.PAID,
      number: 1,
      policyId: policyId,
      totalValue: 10,
      iofValue: 1,
      liquidValue: 9,
      attempts: 1,
      agency: '1',
      account: '123',
      transactionCode: 123,
      dueDate: '01/06/2022',
    });

    await this.installmentRepository.save({
      status: InstallmentStatusEnum.PENDING,
      number: 2,
      policyId: policyId,
      totalValue: 10,
      iofValue: 1,
      liquidValue: 9,
      attempts: 0,
      agency: '1',
      account: '123',
      transactionCode: 0,
      dueDate: '01/06/2022',
    });

    await this.installmentRepository.save({
      status: InstallmentStatusEnum.PENDING,
      number: 3,
      policyId: policyId,
      totalValue: 10,
      iofValue: 1,
      liquidValue: 9,
      attempts: 0,
      agency: '1',
      account: '123',
      transactionCode: 0,
      dueDate: '01/06/2022',
    });

    await this.enableConstraints(this.installmentRepository);

    return policyId;
  }

  public async getAllInstallments(): Promise<InstallmentEntity[]> {
    return await this.installmentRepository.createQueryBuilder().orderBy('numero').getMany();
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.installmentRepository.metadata.tableName);
  }
}
