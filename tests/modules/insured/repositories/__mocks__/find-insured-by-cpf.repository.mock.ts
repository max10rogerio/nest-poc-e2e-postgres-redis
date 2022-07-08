import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { InsuredEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class FindInsuredByCPFRepositorySeeder extends SeederAbstract {
  insuredRepository: Repository<InsuredEntity>;

  constructor() {
    super();

    this.insuredRepository = this.connection.getRepository(InsuredEntity);
  }

  public async seed(): Promise<any> {
    await this.insuredRepository.save({
      ...this.getInsured(),
    });
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.insuredRepository.metadata.tableName);
  }

  public getInsured(): InsuredEntity {
    const insured = new InsuredEntity();

    insured.id = 1;
    insured.cpf = '11111111111';
    insured.birthDate = '1995-01-01' as any;
    insured.name = 'test';
    insured.email = 'test@test.com';
    insured.gender = GenderEnum.FEMALE;
    insured.maritalStatus = MaritalStatusEnum.DIVORCED;
    insured.telephone = '44444444444';

    return insured;
  }
}
