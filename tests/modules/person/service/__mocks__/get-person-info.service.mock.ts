import { GetUserInfoRepositoryResponse, MaritalStatus, Sex } from 'src/modules/apolo/repositories';
import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';

export const mock: GetUserInfoRepositoryResponse = {
  person_id: 'ff2cf9a9-fa67-4594-9852-8f6725609e59',
  cpf: '76073667418',
  name: 'Srta. Felipe Santos',
  mother_name: 'Maria Helena Pereira Neto',
  father_name: null,
  sex: Sex.MALE,
  marital_status: MaritalStatus.DIVORCED,
  educational_level: 'BASIC',
  risk_rating: 'BAIXA',
  fit_account: true,
  birth: {
    birthdate: '1988-04-04',
    nationality: 'Brasileiro',
    city: 'São Paulo',
    federative_unity: 'SP',
  },
  identity_cards: [
    {
      register_field: '46433212611',
      federative_unity: 'PR',
      dispatching_agency: 'SESP-PR',
      dispatch_date: '1972-07-16',
      type: 'CPF',
    },
  ],
  residencial_address: {
    cep: '87485000',
    street: 'Rua dos Ipês',
    house_number: '455',
    neighborhood: 'Bairro das Árvores',
    complement: 'Ed. Jatobá, Apto. 10',
    city: {
      name: 'Maringá',
      state: {
        initials: 'PR',
        name: 'Paraná',
      },
    },
  },
  contacts: [
    {
      phone_number: '27853458940',
      alternative_phone_number: '84109188437',
      email: 'MariaEduarda.Nogueira58@hotmail.com',
      description: 'PAI',
      name: 'Srta. Emanuel Melo',
      type: 'FAMILIAR',
    },
  ],
  personal_contact: {
    phone_number: '44988880000',
    alternative_phone_number: '44988881110',
    email: 'contato1@email.com',
  },
};

export const expected = {
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

export const mockNoAddress = {
  person_id: 'ff2cf9a9-fa67-4594-9852-8f6725609e59',
  cpf: '76073667418',
  name: 'Srta. Felipe Santos',
  mother_name: 'Maria Helena Pereira Neto',
  father_name: null,
  sex: Sex.MALE,
  marital_status: MaritalStatus.DIVORCED,
  educational_level: 'BASIC',
  risk_rating: 'BAIXA',
  fit_account: true,
  birth: {
    birthdate: '1988-04-04',
    nationality: 'Brasileiro',
    city: 'São Paulo',
    federative_unity: 'SP',
  },
  identity_cards: [
    {
      register_field: '46433212611',
      federative_unity: 'PR',
      dispatching_agency: 'SESP-PR',
      dispatch_date: '1972-07-16',
      type: 'CPF',
    },
  ],
  addresses: [
    {
      cep: '87485000',
      street: 'Rua dos Ipês',
      house_number: '455',
      neighborhood: 'Bairro das Árvores',
      complement: 'Ed. Jatobá, Apto. 10',
      type: 'COMERCIAL',
      city: {
        name: 'Maringá',
        state: {
          initials: 'PR',
          name: 'Paraná',
        },
      },
    },
    {
      cep: '87485000',
      street: 'Rua das Flores',
      house_number: '622',
      neighborhood: 'Bairro das Árvores',
      complement: 'Ed. Comercial',
      type: 'COMERCIAL',
      city: {
        name: 'Maringá',
        state: {
          initials: 'PR',
          name: 'Paraná',
        },
      },
    },
  ],
  contacts: [
    {
      phone_number: '27853458940',
      alternative_phone_number: '84109188437',
      email: 'MariaEduarda.Nogueira58@hotmail.com',
      description: 'PAI',
      name: 'Srta. Emanuel Melo',
      type: 'FAMILIAR',
    },
  ],
  personal_contact: {
    phone_number: '44988880000',
    alternative_phone_number: '44988881110',
    email: 'contato1@email.com',
  },
  residences: [
    {
      description: 'Apartamento',
      cep: '21100193',
      value: '1939513.00',
      city: {
        name: 'Maringá',
        state: {
          initials: 'PR',
          name: 'Paraná',
        },
      },
    },
  ],
};

export const expectedNoAddress = {
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

export const mockNoContact = {
  person_id: '32d077ef-9c1c-4457-a759-4bd0a00a75f8',
  cpf: '49683661327',
  name: 'Sophie Pietra Evelyn Costa',
  mother_name: 'Lorena Vanessa',
  father_name: 'Lucas Jorge Marcelo Costa',
  sex: Sex.FEMALE,
  marital_status: MaritalStatus.DIVORCED,
  educational_level: 'SUPERIOR',
  risk_rating: 'BAIXA',
  fit_account: true,
  birth: null,
  residencial_address: {
    cep: '78250000',
    street: 'Rua dos Ipês',
    house_number: '455',
    neighborhood: 'Bairro das Árvores',
    complement: 'Ed. Jatobá, Apto. 10',
    type: 'RESIDENCIAL',
    city: {
      name: 'Pontes e Lacerda',
      state: {
        initials: 'MT',
        name: 'Mato Grosso',
      },
    },
  },
  contacts: [],
  identity_cards: [],
  personal_contact: null,
  residences: [],
};

export const expectedNoContact = {
  name: 'Sophie Pietra Evelyn Costa',
  sex: GenderEnum.FEMALE,
  birthdate: null,
  cpf: '49683661327',
  maritalStatus: MaritalStatusEnum.DIVORCED,
  address: {
    neighborhood: 'Bairro das Árvores',
    street: 'Rua dos Ipês',
    houseNumber: '455',
    complement: 'Ed. Jatobá, Apto. 10',
    zipCode: '78250000',
    city: 'Pontes e Lacerda',
    state: 'MT',
  },
  contact: {
    email: undefined,
    phoneNumber: undefined,
    alternativePhoneNumber: undefined,
  },
};
