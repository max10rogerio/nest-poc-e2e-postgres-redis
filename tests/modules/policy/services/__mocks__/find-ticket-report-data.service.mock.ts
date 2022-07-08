import { TicketContext } from 'src/modules/pdf/contexts';

export const reportPolicyData: TicketContext = {
  product: {
    title: 'Produto RES',
    group: '22',
    susepCode: '456',
    contractName: 'Name of Contract',
  },
  policy: {
    ticket: '123',
    luckNumber: '87001',
    createdAt: undefined,
    startDate: new Date(),
    endDate: new Date(),
    totalValue: 9.9,
    iofPercentage: 1,
    iofValue: 1,
    comissionTotalPercentage: 20,
    agent: {
      name: 'Oiram',
      cnpj: '50161743000111',
      comissionPercentage: 10,
      comissionValue: 0.99,
    },
    broker: {
      name: 'Mario Broker',
      susepCode: '123456',
    },
    insured: {
      name: 'John Johnson',
      birthdate: new Date(),
      cpf: '10955978092',
      gender: 'M',
      phoneNumber: '44999998844',
      address: undefined,
    },
    residential: {
      habitation: '',
      construction: '',
      property: '',
      address: {
        zipCode: '',
        street: '',
        neighborhood: '',
        complement: '',
        houseNumber: '',
        state: '',
      },
    },
    coverages: [
      {
        title: 'Incêndio, Explosão de Qualquer Natureza',
        franchiseText: 'Franquia',
        prizeValue: 19.9,
        shortageText: 'Texto shortage',
      },
      {
        title: 'Vendaval, Furacão, Tornado, Granizo',
        franchiseText: 'Franquia',
        prizeValue: 19.9,
        shortageText: 'Texto shortage',
      },
    ],
    benefitsAndSupports: [
      {
        title: 'Encanador',
        capitalValue: 50,
        generalText: 'Limitado ao que a gazin quiser',
      },
      {
        title: 'Sorteio Mensal',
        capitalValue: 50,
        generalText: 'Limitado ao que a gazin quiser',
      },
      {
        title: 'Chaveiro',
        capitalValue: 50,
        generalText: 'Limitado ao que a gazin quiser',
      },
    ],
    payments: [
      {
        number: 1,
        dueDate: undefined,
        iofValue: 1.1,
        totalValue: 9.9,
        agency: '321',
        account: '12345',
      },
      {
        number: 2,
        dueDate: undefined,
        iofValue: 1.1,
        totalValue: 9.9,
        agency: '321',
        account: '12345',
      },
      {
        number: 3,
        dueDate: undefined,
        iofValue: 1.1,
        totalValue: 9.9,
        agency: '321',
        account: '12345',
      },
    ],
  },
};
