import { Test, TestingModule } from '@nestjs/testing';
import { InsuredNotFound } from 'src/errors';
import { InsuredEntity } from 'src/modules/database/models';
import { FindInsuredByCPFRepository } from 'src/modules/insured/repositories';
import { FindInsuredByCPFService } from 'src/modules/insured/services';
import { insuredMock } from './__mocks__/find-insured-by-cpf.service.mock';

describe('FindInsuredByCPFService (Unit)', () => {
  let findInsuredByCPFService: FindInsuredByCPFService;
  let findInsuredByCPFRepository: FindInsuredByCPFRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindInsuredByCPFService,
        {
          provide: FindInsuredByCPFRepository,
          useFactory: () => ({
            findByCPF: jest.fn(),
          }),
        },
      ],
    }).compile();

    findInsuredByCPFService = app.get<FindInsuredByCPFService>(FindInsuredByCPFService);
    findInsuredByCPFRepository = app.get<FindInsuredByCPFRepository>(FindInsuredByCPFRepository);
  });

  it('should be return a insured data', async () => {
    jest.spyOn(findInsuredByCPFRepository, 'findByCPF').mockResolvedValue(insuredMock as InsuredEntity);

    const cpf = '111111111';

    await expect(findInsuredByCPFService.findByCPF(cpf)).resolves.toEqual(insuredMock);
  });

  it('should be return an error InsuredNotFound', async () => {
    jest.spyOn(findInsuredByCPFRepository, 'findByCPF').mockResolvedValue(null);

    const cpf = '111111111';

    await expect(findInsuredByCPFService.findByCPF(cpf)).rejects.toThrow(InsuredNotFound);
  });
});
