import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';

export const personComplete = {
  name: 'Srta. Felipe Santos',
  sex: GenderEnum.MALE,
  birthdate: '1988-04-04',
  cpf: '76073667418',
  maritalStatus: MaritalStatusEnum.DIVORCED,
  address: {
    neighborhood: 'Bairro das Árvores',
    street: 'Rua dos Ipês',
    houseNumber: '455',
    complement: 'Ed. Jatobá, Apto. 10',
    zipCode: '87485000',
    city: 'Maringá',
    state: 'PR',
  },
  contact: {
    email: 'contato1@email.com',
    phoneNumber: '44988880000',
    alternativePhoneNumber: '44988881110',
  },
};

export const personResponseComplete = {
  name: 'Srta. Felipe Santos',
  sex: GenderEnum.MALE,
  cpf: '76073667418',
  birthdate: '1988-04-04',
  marital_status: MaritalStatusEnum.DIVORCED,
  address: {
    city: 'Maringá',
    complement: 'Ed. Jatobá, Apto. 10',
    house_number: '455',
    neighborhood: 'Bairro das Árvores',
    state: 'PR',
    street: 'Rua dos Ipês',
    zip_code: '87485000',
  },
  contact: {
    email: 'contato1@email.com',
    phone_number: '44988880000',
    alternative_phone_number: '44988881110',
  },
};

export const personNoAddress = {
  name: 'Srta. Felipe Santos',
  sex: GenderEnum.MALE,
  birthdate: '1988-04-04',
  cpf: '76073667418',
  maritalStatus: MaritalStatusEnum.DIVORCED,
  address: null,
  contact: {
    email: 'contato1@email.com',
    phoneNumber: '44988880000',
    alternativePhoneNumber: '44988881110',
  },
};

export const personResponseNoAddress = {
  name: 'Srta. Felipe Santos',
  sex: GenderEnum.MALE,
  cpf: '76073667418',
  birthdate: '1988-04-04',
  marital_status: MaritalStatusEnum.DIVORCED,
  address: null,
  contact: {
    email: 'contato1@email.com',
    phone_number: '44988880000',
    alternative_phone_number: '44988881110',
  },
};

export const personNoContact = {
  name: 'Srta. Felipe Santos',
  sex: GenderEnum.MALE,
  birthdate: '1988-04-04',
  cpf: '76073667418',
  maritalStatus: MaritalStatusEnum.DIVORCED,
  address: {
    neighborhood: 'Bairro das Árvores',
    street: 'Rua dos Ipês',
    houseNumber: '455',
    complement: 'Ed. Jatobá, Apto. 10',
    zipCode: '87485000',
    city: 'Maringá',
    state: 'PR',
  },
  contact: null,
};

export const personResponseNoContact = {
  name: 'Srta. Felipe Santos',
  sex: GenderEnum.MALE,
  cpf: '76073667418',
  birthdate: '1988-04-04',
  marital_status: MaritalStatusEnum.DIVORCED,
  address: {
    city: 'Maringá',
    complement: 'Ed. Jatobá, Apto. 10',
    house_number: '455',
    neighborhood: 'Bairro das Árvores',
    state: 'PR',
    street: 'Rua dos Ipês',
    zip_code: '87485000',
  },
  contact: null,
};
