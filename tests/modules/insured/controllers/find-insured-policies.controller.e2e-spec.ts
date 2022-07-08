import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { InsuredModule } from 'src/modules/insured/insured.module';
import * as request from 'supertest';
import { FindInsuredPoliciesSeeder } from './__mocks__/find-insured-policies.mock';

describe('FindInsuredPoliciesController - e2e', () => {
  let app: INestApplication;
  let seeder: FindInsuredPoliciesSeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [InsuredModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    seeder = new FindInsuredPoliciesSeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it("[SUCCESS] [200] /api/insured/:cpf - should be return a list of policies by cpf's insured", async () => {
    await seeder.seed();

    const { status, body } = await request(app.getHttpServer()).get(`/insured/${seeder.cpf}/policies`);
    const expected = [
      {
        icon: 'http://localhost:9999/test.jpg',
        name: 'test',
        policy_id: 1,
        ticket: '123456',
      },
    ];

    expect(status).toEqual(HttpStatus.OK);
    expect(body).toEqual(expected);
  });

  it("[SUCCESS] [200] /api/insured/:cpf - should be return an empty list when insured does't not have any policy", async () => {
    const { status, body } = await request(app.getHttpServer()).get(`/insured/${seeder.cpf}/policies`);
    const expected = [];

    expect(status).toEqual(HttpStatus.OK);
    expect(body).toEqual(expected);
  });
});
