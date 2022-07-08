import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { InsuredModule } from 'src/modules/insured/insured.module';
import { FindInsuredByCPFRepository } from 'src/modules/insured/repositories';
import { FindInsuredByCPFRepositorySeeder } from './__mocks__/find-insured-by-cpf.repository.mock';

describe('FindInsuredByCPFRepository (E2E)', () => {
  let app: INestApplication;
  let seeder: FindInsuredByCPFRepositorySeeder;
  let findInsuredByCPFRepository: FindInsuredByCPFRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, InsuredModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    findInsuredByCPFRepository = app.get<FindInsuredByCPFRepository>(FindInsuredByCPFRepository);

    seeder = new FindInsuredByCPFRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should be return undefined when not found insured', async () => {
    await expect(findInsuredByCPFRepository.findByCPF('1111111')).resolves.toBeUndefined();
  });

  it('should be return a insured data', async () => {
    await seeder.seed();

    const insured = await findInsuredByCPFRepository.findByCPF(seeder.getInsured().cpf);

    expect(insured).toEqual(
      expect.objectContaining({
        ...seeder.getInsured(),
        id: 1,
      }),
    );
  });
});
