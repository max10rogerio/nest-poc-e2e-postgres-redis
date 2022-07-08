import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { AddressEntity, InsuredEntity } from 'src/modules/database/models';
import { CreateInsuredRepositoryParams } from 'src/modules/insured/repositories';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class CreateInsuredRepositorySeeder extends SeederAbstract {
  insuredRepository: Repository<InsuredEntity>;
  addressRepository: Repository<AddressEntity>;

  constructor() {
    super();

    this.insuredRepository = this.connection.getRepository(InsuredEntity);
    this.addressRepository = this.connection.getRepository(AddressEntity);
  }

  public async seed(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.insuredRepository.metadata.tableName);
    await this.truncateTable(this.addressRepository.metadata.tableName);
  }

  public getValuesToInsert(): CreateInsuredRepositoryParams {
    return {
      cpf: '99999999999',
      birthdate: '1995-01-01',
      email: 'test@test.com',
      gender: GenderEnum.MALE,
      maritalStatus: MaritalStatusEnum.MARRIED,
      name: 'Test Name',
      phoneNumber: '4499999999',
    };
  }

  public getInsuredEntitySchema(): Partial<InsuredEntity> {
    const values = this.getValuesToInsert();

    return {
      id: 1,
      cpf: values.cpf,
      name: values.name,
      email: values.email,
      gender: values.gender,
      telephone: values.phoneNumber,
      birthDate: values.birthdate as any,
      maritalStatus: values.maritalStatus,
    };
  }
}
