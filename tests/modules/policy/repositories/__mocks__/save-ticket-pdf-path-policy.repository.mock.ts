import { PolicyEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class SaveTicketPdfPathPolicyRepositorySeeder extends SeederAbstract {
  readonly policyId = 1;

  policyRepository: Repository<PolicyEntity>;

  constructor() {
    super();

    this.policyRepository = this.connection.getRepository(PolicyEntity);
  }

  public async seed(): Promise<any> {
    await this.disableConstraints(this.policyRepository);

    await this.policyRepository.save({
      agentId: 1,
      contractDate: new Date(),
      endDate: new Date(),
      id: this.policyId,
      luckNumber: 1,
      planId: 1,
      startDate: new Date(),
      addressId: 1,
      ticket: '123456',
      totalValue: 4.5,
      liquidValue: 3.33,
      iofValue: 2.12,
      insuredId: 1,
    });

    await this.enableConstraints(this.policyRepository);
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.policyRepository.metadata.tableName);
  }
}
