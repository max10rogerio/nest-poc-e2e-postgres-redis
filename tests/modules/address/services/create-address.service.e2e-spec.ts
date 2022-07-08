import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressModule } from 'src/modules/address/address.module';
import { CreateAddressService } from 'src/modules/address/services';
import { DatabaseModule } from 'src/modules/database/database.module';
import { CreateAddressServiceSeeder } from './__mocks__/create-address.service.mock';

describe('AddressService (e2e)', () => {
  let app: INestApplication;
  let addressService: CreateAddressService;
  let createAddressServiceSeeder: CreateAddressServiceSeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AddressModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    createAddressServiceSeeder = new CreateAddressServiceSeeder();
    addressService = app.get<CreateAddressService>(CreateAddressService);
  });

  afterEach(async () => {
    await createAddressServiceSeeder.truncate();
    await app.close();
  });

  it('should be store an address in database', async () => {
    const addressStored = await addressService.create({
      city: 'Maringá',
      houseNumber: '1234',
      neighborhood: 'Test',
      state: 'PR',
      street: 'Test',
      zipCode: '87060420',
      complement: '',
    });

    await expect(createAddressServiceSeeder.addressRepository.findOne(addressStored.id)).resolves.not.toBeFalsy();
  });
});
