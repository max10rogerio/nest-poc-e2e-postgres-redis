import * as dayjs from 'dayjs';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { PolicyEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class CancelPolicyRepositorySeeder extends SeederAbstract {
  policyRepository: Repository<PolicyEntity>;

  constructor() {
    super();

    this.policyRepository = this.connection.getRepository(PolicyEntity);
  }

  public async seed(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async seedPolicy(): Promise<number> {
    await this.disableConstraints(this.policyRepository);
    const day5Before = dayjs().add(-5, 'days').toDate();
    const year1After = dayjs().add(1, 'year').toDate();

    const policy = await this.policyRepository.save({
      ticket: '123',
      luckNumber: 123,
      contractDate: day5Before,
      startDate: day5Before,
      endDate: year1After,
      agentId: 1,
      planId: 1,
      insuredId: 1,
      status: PolicyStatusEnum.ISSUED,
      coverageEndDate: year1After,
      totalValue: 10,
      liquidValue: 10,
      iofValue: 1,
      addressId: 1,
    });

    await this.enableConstraints(this.policyRepository);
    return policy.id;
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.policyRepository.metadata.tableName);
  }
}
