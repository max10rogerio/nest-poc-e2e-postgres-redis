import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { AddressEntity, InsuredEntity } from 'src/modules/database/models';
import { CreateInsuredServiceParams, CreateInsuredServiceResponse } from 'src/modules/insured/services';

export const createInsuredResponse = (): CreateInsuredServiceResponse => {
  const address = new AddressEntity();

  address.id = 1;
  address.cep = '87060420';
  address.city = 'Maringá';
  address.complement = 'House';
  address.neighborhood = 'Test';
  address.number = '123b';
  address.street = 'test';
  address.uf = 'PR';
  address.createdAt = new Date();
  address.updatedAt = new Date();

  const insured = new InsuredEntity();

  insured.id = 1;
  insured.cpf = '11111111111';
  insured.birthDate = '1995-01-01' as any;
  insured.name = 'test';
  insured.email = 'test@test.com';
  insured.gender = GenderEnum.FEMALE;
  insured.maritalStatus = MaritalStatusEnum.DIVORCED;
  insured.telephone = '44444444444';
  insured.createdAt = new Date();
  insured.updatedAt = new Date();

  return insured;
};

export const createInsuredParams = (): CreateInsuredServiceParams => {
  return {
    cpf: '11111111111',
    birthdate: '1995-01-01' as any,
    name: 'test',
    email: 'test@test.com',
    gender: GenderEnum.FEMALE,
    maritalStatus: MaritalStatusEnum.DIVORCED,
    phoneNumber: '44444444444',
  };
};
