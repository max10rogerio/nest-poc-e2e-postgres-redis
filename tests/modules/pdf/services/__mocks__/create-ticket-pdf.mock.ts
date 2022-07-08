import * as dayjs from 'dayjs';
import { TicketContext } from 'src/modules/pdf/contexts';

const makeAgent = () => ({
  name: 'Gazin Cred',
  cnpj: '11760553000169',
  comissionPercentage: 40,
  comissionValue: 30,
});

const makeBroker = () => ({
  name: 'K R L CORRETORA DE SEGUROS LTDA',
  susepCode: '202095926',
});

const makeInsured = () => ({
  birthdate: dayjs('1990-02-11').toDate(),
  cpf: '07001780901',
  gender: 'F',
  phoneNumber: '44998825268',
  name: 'Maira Cristina Engel',
  address: {
    complement: 'Casa',
    houseNumber: '1779',
    neighborhood: 'Jardim Universo',
    zipCode: '87060420',
    state: 'PR',
    street: 'Rua Universo',
  },
});

const makePayments = () =>
  Array(12)
    .fill(0)
    .map((_, index) => ({
      dueDate: new Date(),
      iofValue: 0.04,
      totalValue: 9.9,
      number: index + 1,
      account: '001',
      agency: '132454',
    }));

export const RE_CONTEXT: TicketContext = {
  product: {
    title: 'RESIDENCIAL PREMIÁVEL',
    group: '1602',
    susepCode: '15414.900022/2019-03',
    contractName: 'MICROSSEGURO DE RESIDENCIAL PREMIÁVEL',
  },
  policy: {
    payments: makePayments(),
    agent: makeAgent(),
    broker: makeBroker(),
    insured: makeInsured(),
    createdAt: new Date(),
    ticket: '350000000000001',
    startDate: new Date(),
    endDate: dayjs().add(1, 'year').toDate(),
    iofPercentage: 0.38,
    iofValue: 0.45,
    luckNumber: '123456',
    totalValue: 118.8,
    comissionTotalPercentage: 40,
    residential: {
      habitation: 'Habitual',
      construction: 'Marecenaria',
      property: 'casa',
      address: {
        complement: 'Casa',
        houseNumber: '1779',
        neighborhood: 'Jardim Universo',
        zipCode: '87060420',
        state: 'PR',
        street: 'Rua Universo',
      },
    },
    coverages: [
      {
        title: 'Incêndio, Queda de Raio e Explosão',
        capitalValue: 80000,
        prizeValue: 58.3,
      },
      {
        title: 'Vendaval (inclusive Furacão, Ciclone e Tornado) e Granizo',
        capitalValue: 4000,
        prizeValue: 72.82,
      },
    ],
    benefitsAndSupports: [
      {
        title: 'Sorteio Mensal',
        capitalValue: 25000,
      },
      {
        title: 'Encanador',
        generalText: 'Limitado à 01(uma) utilização durante a vigência, limitado à R$ 150,00 (cento e cinquenta reais)',
      },
      {
        title: 'Chaveiro',
        generalText: 'Limitado à 01(uma) utilização durante a vigência, limitado à R$ 150,00 (cento e cinquenta reais)',
      },
      {
        title: 'Eletrecista',
        generalText: 'Limitado à 01(uma) utilização durante a vigência, limitado à R$ 150,00 (cento e cinquenta reais)',
      },
    ],
  },
};

export const DIH_CONTEXT: TicketContext = {
  product: {
    title: 'PESSOAS PREMIÁVEL',
    group: '1601',
    susepCode: '15414.612179/2020-18',
    contractName: 'MICROSSEGURO DE PESSOAS PREMIÁVEL',
  },
  policy: {
    createdAt: new Date(),
    ticket: '350000000000001',
    luckNumber: '12345',
    startDate: new Date(),
    endDate: dayjs().add(1, 'year').toDate(),
    iofPercentage: 0.38,
    iofValue: 0.45,
    totalValue: 118.8,
    comissionTotalPercentage: 40,
    agent: makeAgent(),
    broker: makeBroker(),
    insured: makeInsured(),
    payments: makePayments(),
    coverages: [
      {
        title: 'Diárias de internação hospitalar',
        capitalValue: 50,
        capitalText: 'Até 30 diárias de',
        franchiseText: '24 horas',
        shortageText: '30 dias (doença)',
        prizeValue: 118.8,
      },
    ],
    benefitsAndSupports: [
      {
        title: 'Sorteio Mensal',
        capitalValue: 25000,
      },
    ],
  },
};
