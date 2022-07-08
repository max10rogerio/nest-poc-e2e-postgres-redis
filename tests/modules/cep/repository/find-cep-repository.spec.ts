import { Test, TestingModule } from '@nestjs/testing';
import { FindCepRepository } from 'src/modules/cep/repository';

const mock = {
  cep: '87060420',
  city: 'Maringá',
  neighborhood: 'Jardim Universo',
  state: 'PR',
  street: 'Rua Universo',
  service: 'correios',
};

jest.mock(
  'cep-promise',
  () => () =>
    Promise.resolve({
      cep: '87060420',
      city: 'Maringá',
      neighborhood: 'Jardim Universo',
      state: 'PR',
      street: 'Rua Universo',
      service: 'correios',
    }),
);

describe('FindCepRepository (Unit)', () => {
  let findCepRepository: FindCepRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [FindCepRepository],
    }).compile();

    findCepRepository = app.get<FindCepRepository>(FindCepRepository);
  });

  it('should be call repository and return a response', async () => {
    await expect(findCepRepository.find('87060420')).resolves.toEqual(mock);
  });
});
