import { Test, TestingModule } from '@nestjs/testing';
import { GetPersonInfoController } from 'src/modules/person/controllers';
import { GetPersonInfoService } from 'src/modules/person/services';
import { personComplete, personResponseComplete } from './__mocks__/get-person-info-response.dto.mock';

describe('GetPersonInfoController (Unit)', () => {
  let getPersonInfoService: GetPersonInfoService;
  let getPersonInfoController: GetPersonInfoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        GetPersonInfoController,
        {
          provide: GetPersonInfoService,
          useFactory: () => ({
            getPersonByCPF: jest.fn(),
          }),
        },
      ],
    }).compile();

    getPersonInfoService = app.get<GetPersonInfoService>(GetPersonInfoService);
    getPersonInfoController = app.get<GetPersonInfoController>(GetPersonInfoController);

    await app.init();
  });

  it('should return person info', async () => {
    jest.spyOn(getPersonInfoService, 'getPersonByCPF').mockResolvedValue(personComplete);

    expect(getPersonInfoController.getPersonByCPF({ cpf: '123456' })).resolves.toEqual(personResponseComplete);
  });
});
