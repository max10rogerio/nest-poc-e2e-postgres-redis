import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { GenderEnum, MaritalStatusEnum, StatusEnum } from 'src/modules/common/constants';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { FindPoliciesNotExportedRepositoryResponse } from 'src/modules/export/repositories';
import { CreateExportServiceResponse } from 'src/modules/export/services';

export const policiesDih: FindPoliciesNotExportedRepositoryResponse = [
  {
    id: 3,
    ticketPDF: 'test.pdf',
    ticket: '789000000000003',
    luckNumber: 1503,
    contractDate: new Date('2022-06-10T19:22:43.287Z'),
    startDate: new Date('2022-06-10'),
    endDate: new Date('2022-06-10'),
    agentId: 1,
    exportId: 11,
    planId: 1,
    insuredId: 1,
    addressId: 1,
    createdAt: new Date('2022-06-10T22:22:43.288Z'),
    updatedAt: new Date('2022-06-13T21:33:58.012Z'),
    deletedAt: null,
    status: PolicyStatusEnum.ISSUED,
    cancellationDate: null,
    coverageEndDate: null,
    totalValue: 0,
    liquidValue: 0,
    iofValue: 0,
    agent: undefined,
    export: undefined,
    policiesResidential: undefined,
    installments: undefined,
    hasId: () => true,
    save: undefined,
    remove: undefined,
    softRemove: undefined,
    recover: undefined,
    reload: undefined,
    plan: {
      id: 1,
      code: 123,
      description: 'DIH',
      summary: 'DIH',
      productId: 1,
      prizeValue: 19,
      numberInstallments: 12,
      iofValue: 2.57,
      createdAt: new Date('2022-06-10T22:21:58.726Z'),
      updatedAt: new Date('2022-06-10T22:21:58.726Z'),
      deletedAt: null,
      product: undefined,
      planCoverage: undefined,
      policies: undefined,
      hasId: () => true,
      save: undefined,
      remove: undefined,
      softRemove: undefined,
      recover: undefined,
      reload: undefined,
    },
    insured: {
      id: 1,
      cpf: '75756697012',
      name: 'TESTE',
      birthDate: new Date('1990-06-24'),
      gender: GenderEnum.MALE,
      maritalStatus: MaritalStatusEnum.SINGLE,
      telephone: '35994563213',
      email: 'teste@gmail.com',
      createdAt: new Date('2022-06-10T22:28:44.640Z'),
      updatedAt: new Date('2022-06-10T22:28:44.640Z'),
      deletedAt: null,
      policies: undefined,
      hasId: () => true,
      save: undefined,
      remove: undefined,
      softRemove: undefined,
      recover: undefined,
      reload: undefined,
    },
    address: {
      id: 1,
      cep: '37890000',
      street: 'RUA LINDOLFO COIMBRA',
      number: '209',
      neighborhood: 'Centro',
      complement: '',
      city: 'Muzambinho',
      uf: 'MG',
      createdAt: new Date('2022-06-10T22:28:00.506Z'),
      updatedAt: new Date('2022-06-10T22:28:00.506Z'),
      deletedAt: null,
      policy: undefined,
      policiesResidential: undefined,
      hasId: () => true,
      save: undefined,
      remove: undefined,
      softRemove: undefined,
      recover: undefined,
      reload: undefined,
    },
  },
];

export const exportDih: CreateExportServiceResponse = {
  type: ExportTypeEnum.DIH,
  log: '',
  file: 'dih-20220614-161741.txt',
  status: StatusEnum.SUCCESS,
  id: 20,
  createdAt: new Date('2022-06-14T22:17:44.404Z'),
  policies: undefined,
  hasId: () => true,
  save: undefined,
  remove: undefined,
  softRemove: undefined,
  recover: undefined,
  reload: undefined,
};

export const policiesRe: FindPoliciesNotExportedRepositoryResponse = [
  {
    id: 4,
    ticketPDF: 'test.pdf',
    ticket: '789000000000004',
    luckNumber: 1504,
    contractDate: new Date('2022-06-10T19:23:31.807Z'),
    startDate: new Date('2022-06-10'),
    endDate: new Date('2022-06-10'),
    agentId: 1,
    exportId: 8,
    planId: 2,
    insuredId: 1,
    addressId: 1,
    createdAt: new Date('2022-06-10T22:23:31.807Z'),
    updatedAt: new Date('2022-06-10T23:30:30.289Z'),
    deletedAt: null,
    status: PolicyStatusEnum.ISSUED,
    cancellationDate: null,
    coverageEndDate: null,
    totalValue: 85.32,
    liquidValue: 0,
    iofValue: 0,
    agent: undefined,
    export: undefined,
    installments: undefined,
    hasId: () => true,
    save: undefined,
    remove: undefined,
    softRemove: undefined,
    recover: undefined,
    reload: undefined,
    plan: {
      id: 2,
      code: 124,
      description: 'RE',
      summary: 'RE',
      productId: 2,
      prizeValue: 22.14,
      numberInstallments: 12,
      iofValue: 2.57,
      createdAt: new Date('2022-06-10T22:22:16.293Z'),
      updatedAt: new Date('2022-06-10T22:22:16.293Z'),
      deletedAt: null,
      product: undefined,
      planCoverage: undefined,
      policies: undefined,
      hasId: () => true,
      save: undefined,
      remove: undefined,
      softRemove: undefined,
      recover: undefined,
      reload: undefined,
    },
    insured: {
      id: 1,
      cpf: '75756697012',
      name: 'TESTE',
      birthDate: new Date('1990-06-24'),
      gender: GenderEnum.MALE,
      maritalStatus: MaritalStatusEnum.SINGLE,
      telephone: '35994563213',
      email: 'teste@gmail.com',
      createdAt: new Date('2022-06-10T22:28:44.640Z'),
      updatedAt: new Date('2022-06-10T22:28:44.640Z'),
      deletedAt: null,
      policies: undefined,
      hasId: () => true,
      save: undefined,
      remove: undefined,
      softRemove: undefined,
      recover: undefined,
      reload: undefined,
    },
    address: {
      id: 1,
      cep: '37890000',
      street: 'RUA LINDOLFO COIMBRA',
      number: '209',
      neighborhood: 'Centro',
      complement: '',
      city: 'Muzambinho',
      uf: 'MG',
      createdAt: new Date('2022-06-10T22:28:00.506Z'),
      updatedAt: new Date('2022-06-10T22:28:00.506Z'),
      deletedAt: null,
      policy: undefined,
      policiesResidential: undefined,
      hasId: () => true,
      save: undefined,
      remove: undefined,
      softRemove: undefined,
      recover: undefined,
      reload: undefined,
    },
    policiesResidential: [
      {
        id: 1,
        policyId: 4,
        addressId: 1,
        propertyId: 1,
        createdAt: new Date('2022-06-10T23:30:00.646Z'),
        updatedAt: new Date('2022-06-10T23:30:00.646Z'),
        deletedAt: null,
        policy: undefined,
        property: undefined,
        hasId: () => true,
        save: undefined,
        remove: undefined,
        softRemove: undefined,
        recover: undefined,
        reload: undefined,
        address: {
          id: 1,
          cep: '37890000',
          street: 'RUA LINDOLFO COIMBRA',
          number: '209',
          neighborhood: 'Centro',
          complement: '',
          city: 'Muzambinho',
          uf: 'MG',
          createdAt: new Date('2022-06-10T22:28:00.506Z'),
          updatedAt: new Date('2022-06-10T22:28:00.506Z'),
          deletedAt: null,
          policy: undefined,
          policiesResidential: undefined,
          hasId: () => true,
          save: undefined,
          remove: undefined,
          softRemove: undefined,
          recover: undefined,
          reload: undefined,
        },
      },
    ],
  },
];

export const exportRe: CreateExportServiceResponse = {
  type: ExportTypeEnum.RE,
  log: '',
  file: 're-20220614-170216.txt',
  status: StatusEnum.SUCCESS,
  id: 21,
  createdAt: new Date('2022-06-14T23:02:19.467Z'),
  policies: undefined,
  hasId: () => true,
  save: undefined,
  remove: undefined,
  softRemove: undefined,
  recover: undefined,
  reload: undefined,
};

export const exportError: CreateExportServiceResponse = {
  type: ExportTypeEnum.DIH,
  log: 'Timeout (control socket)',
  file: 'dih-20220614-161741.txt',
  status: StatusEnum.ERROR,
  id: 20,
  createdAt: new Date('2022-06-14T22:17:44.404Z'),
  policies: undefined,
  hasId: () => true,
  save: undefined,
  remove: undefined,
  softRemove: undefined,
  recover: undefined,
  reload: undefined,
};

export const errorExport: AxiosError = {
  response: {
    data: {
      error: {
        Codigo: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    },
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
} as AxiosError;
