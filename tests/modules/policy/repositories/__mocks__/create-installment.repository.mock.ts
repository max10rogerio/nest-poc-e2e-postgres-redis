import { InstallmentEntity, PolicyEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class CreateInstallmentRepositorySeeder extends SeederAbstract {
  policyRepository: Repository<PolicyEntity>;
  installmentRepository: Repository<InstallmentEntity>;

  constructor() {
    super();

    this.policyRepository = this.connection.getRepository(PolicyEntity);
    this.installmentRepository = this.connection.getRepository(InstallmentEntity);
  }

  public async seed(): Promise<any> {
    await this.disableConstraints(this.policyRepository);

    await this.policyRepository.save({
      agentId: 1,
      contractDate: new Date(),
      endDate: new Date(),
      id: 1,
      luckNumber: 1,
      planId: 1,
      startDate: new Date(),
      ticket: '123456',
      totalValue: 4.5,
      liquidValue: 3.33,
      iofValue: 2.12,
      addressId: 1,
    });

    await this.enableConstraints(this.policyRepository);
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.installmentRepository.metadata.tableName);
    await this.truncateTable(this.policyRepository.metadata.tableName);
  }
}
