import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { CreatePolicyParamsDTO } from 'src/modules/policy/controllers/dto';

export class CreatePolicyDTOMock {
  makeCompletePayload(): CreatePolicyParamsDTO {
    return {
      ...this.makePlan(),
      account: {
        ...this.makeAccount(),
      },
      insured: {
        ...this.makeInsured(),
      },
      residential: {
        ...this.makeResidential(),
        address: this.makeAddress(),
      },
      address: {
        ...this.makeAddress(),
      },
    } as CreatePolicyParamsDTO;
  }

  makeCompleteParams() {
    return {
      account: {
        accountNumber: '47400',
        agencyCode: '1',
      },
      insured: {
        birthdate: '1995-01-01',
        cpf: '08968732930',
        email: 'max10rogerio@hotmail.com',
        gender: 'M',
        maritalStatus: 'Solteiro',
        name: 'Max Rogério',
        phoneNumber: '44998825268',
      },
      planId: 1,
      residential: {
        address: {
          city: 'Maringá',
          complement: null,
          houseNumber: '1779',
          neighborhood: 'Jardim Universo',
          state: 'PR',
          street: 'Rua univeso',
          zipCode: '87060420',
        },
        constructionId: 1,
        habitationId: 1,
        propertyId: 1,
      },
      address: {
        city: 'Maringá',
        complement: null,
        houseNumber: '1779',
        neighborhood: 'Jardim Universo',
        state: 'PR',
        street: 'Rua univeso',
        zipCode: '87060420',
      },
    };
  }

  makeResidential() {
    return {
      habitation_id: 1,
      construction_id: 1,
      property_id: 1,
    };
  }

  makePlan() {
    return {
      plan_id: 1,
    };
  }

  makeInsured() {
    return {
      cpf: '08968732930',
      name: 'Max Rogério',
      birthdate: '1995-01-01',
      phoneNumber: '44998825268',
      email: 'max10rogerio@hotmail.com',
      gender: GenderEnum.MALE,
      marital_status: MaritalStatusEnum.SINGLE,
    };
  }

  makeAddress() {
    return {
      zip_code: '87060420',
      street: 'Rua univeso',
      house_number: '1779',
      neighborhood: 'Jardim Universo',
      complement: null,
      city: 'Maringá',
      state: 'PR',
    };
  }

  makeAccount() {
    return {
      agency_code: 1,
      account_number: '47400',
    };
  }
}
