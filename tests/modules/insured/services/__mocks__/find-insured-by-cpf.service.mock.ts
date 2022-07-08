import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
import { FindInsuredByCPFServiceResponse } from 'src/modules/insured/services';

export const insuredMock: Partial<FindInsuredByCPFServiceResponse> = {
  id: 1,
  birthDate: new Date('1995-01-01'),
  cpf: '11111111111',
  email: 'test@test.com',
  gender: GenderEnum.MALE,
  maritalStatus: MaritalStatusEnum.MARRIED,
  name: 'Insured Test',
  telephone: '44999999999',
};
