import { InstallmentEntity } from 'src/modules/database/models';
import { InstallmentStatusEnum } from 'src/modules/policy/constants';
import { CreateInstallmentRepositoryParams } from 'src/modules/policy/repositories';
import { CreateInstallmentServiceResponse } from 'src/modules/policy/services';

export const createInstallmentResponse = (): CreateInstallmentServiceResponse => {
  const installments: CreateInstallmentServiceResponse = [];

  const installment = new InstallmentEntity();

  installment.id = 1;
  installment.number = 1;
  installment.totalValue = 4.5;
  installment.liquidValue = 3.33;
  installment.iofValue = 2.12;
  installment.status = InstallmentStatusEnum.PAID;
  installment.attempts = 1;
  installment.agency = '0135-6';
  installment.account = '12365-7';
  installment.transactionCode = 123;
  installment.policyId = 1;
  installment.dueDate = new Date().toISOString().split('T')[0];

  installments.push(installment);

  return installments;
};

export const createInstallmentParams = (): CreateInstallmentRepositoryParams[] => {
  return [
    {
      number: 1,
      totalValue: 4.5,
      liquidValue: 3.33,
      iofValue: 2.12,
      status: InstallmentStatusEnum.PAID,
      attempts: 1,
      agency: '0135-6',
      account: '12365-7',
      transactionCode: 123,
      policyId: 1,
      dueDate: new Date().toISOString().split('T')[0],
    },
  ];
};
