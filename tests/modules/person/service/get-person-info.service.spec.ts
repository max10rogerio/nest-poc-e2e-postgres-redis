import { Test, TestingModule } from '@nestjs/testing';
import { PersonNotFound } from 'src/errors';
import { GetUserInfoRepository } from 'src/modules/apolo/repositories';
import { GetPersonInfoService } from 'src/modules/person/services/get-person-info.service';
import {
  expected,
  expectedNoAddress,
  expectedNoContact,
  mock,
  mockNoAddress,
  mockNoContact,
} from './__mocks__/get-person-info.service.mock';

describe('GetPersonInfoService (Unit)', () => {
  let getUserInfoRepository: GetUserInfoRepository;
  let getPersonInfoService: GetPersonInfoService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        GetPersonInfoService,
        {
          provide: GetUserInfoRepository,
          useFactory: () => ({
            getUserInfo: jest.fn(),
          }),
        },
      ],
    }).compile();

    getUserInfoRepository = app.get<GetUserInfoRepository>(GetUserInfoRepository);
    getPersonInfoService = app.get<GetPersonInfoService>(GetPersonInfoService);
  });

  it('should return PersonNotFound error', async () => {
    jest.spyOn(getUserInfoRepository, 'getUserInfo').mockResolvedValue(null);
    const cpf = '123456';

    await expect(getPersonInfoService.getPersonByCPF(cpf)).rejects.toThrow(new PersonNotFound(cpf));
  });

  it('should return GetPersonInfoServiceResponse object', async () => {
    const cpf = '46433212611';

    jest.spyOn(getUserInfoRepository, 'getUserInfo').mockResolvedValue(mock);
    await expect(getPersonInfoService.getPersonByCPF(cpf)).resolves.toEqual(expected);
  });

  it('should return GetPersonInfoServiceResponse no Address', async () => {
    const cpf = '46433212611';

    jest.spyOn(getUserInfoRepository, 'getUserInfo').mockResolvedValue(mockNoAddress as any);
    await expect(getPersonInfoService.getPersonByCPF(cpf)).resolves.toEqual(expectedNoAddress);
  });

  it('should return GetPersonInfoServiceResponse no Contact', async () => {
    const cpf = '49683661327';

    jest.spyOn(getUserInfoRepository, 'getUserInfo').mockResolvedValue(mockNoContact as any);
    await expect(getPersonInfoService.getPersonByCPF(cpf)).resolves.toEqual(expectedNoContact);
  });
});
