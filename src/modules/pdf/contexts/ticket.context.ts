export type TicketContext = {
  product: {
    title: string;
    group: string;
    susepCode: string;
    contractName: string;
  };
  policy: {
    ticket: string;
    luckNumber: string;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    totalValue: number;
    iofPercentage: number;
    iofValue: number;
    comissionTotalPercentage: number;
    agent: {
      name: string;
      cnpj: string;
      comissionPercentage: number;
      comissionValue: number;
    };
    broker: {
      name: string;
      susepCode: string;
    };
    insured: {
      name: string;
      birthdate: Date;
      cpf: string;
      gender: string;
      phoneNumber: string;
      address: {
        zipCode: string;
        street: string;
        neighborhood: string;
        complement: string;
        houseNumber: string;
        state: string;
      };
    };
    residential?: {
      habitation: string;
      construction: string;
      property: string;
      address: {
        zipCode: string;
        street: string;
        neighborhood: string;
        complement: string;
        houseNumber: string;
        state: string;
      };
    };
    coverages: Coverage[];
    benefitsAndSupports: BenefitsAndSupports[];
    payments: Payment[];
  };
};

type BenefitsAndSupports = {
  title: string;
  capitalValue?: number;
  generalText?: string;
};

type Coverage = {
  title: string;
  capitalText?: string;
  capitalValue?: number;
  franchiseText?: string;
  shortageText?: string;
  prizeValue: number;
};

type Payment = {
  number: number;
  dueDate: Date;
  iofValue: number;
  totalValue: number;
  agency: string;
  account: string;
};
