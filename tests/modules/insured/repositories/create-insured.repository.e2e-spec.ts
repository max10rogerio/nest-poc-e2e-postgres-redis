import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { InsuredModule } from 'src/modules/insured/insured.module';
import { CreateInsuredRepository } from 'src/modules/insured/repositories';
import { CreateInsuredRepositorySeeder } from './__mocks__/create-insured.repository.mock';

describe('CreateInsuredRepository (e2e)', () => {
  let app: INestApplication;
  let seeder: CreateInsuredRepositorySeeder;
  let createInsuredRepository: CreateInsuredRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [InsuredModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    createInsuredRepository = app.get<CreateInsuredRepository>(CreateInsuredRepository);

    seeder = new CreateInsuredRepositorySeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('should be store insured info on correctelly tables in database', async () => {
    const mock = seeder.getValuesToInsert();

    await createInsuredRepository.createInsured(mock);

    await expect(seeder.insuredRepository.findOne()).resolves.toMatchObject(
      expect.objectContaining(seeder.getInsuredEntitySchema()),
    );
  });
});
