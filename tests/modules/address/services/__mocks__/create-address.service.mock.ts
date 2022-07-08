import { AddressEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class CreateAddressServiceSeeder extends SeederAbstract {
  addressRepository: Repository<AddressEntity>;

  constructor() {
    super();

    this.addressRepository = this.connection.getRepository(AddressEntity);
  }

  seed(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async truncate(): Promise<void> {
    await this.truncateTable(this.addressRepository.metadata.tableName);
  }
}
