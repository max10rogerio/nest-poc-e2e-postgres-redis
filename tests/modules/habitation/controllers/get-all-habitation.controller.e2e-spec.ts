import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/modules/database/database.module';
import { HabitationModule } from 'src/modules/habitation/habitation.module';
import * as request from 'supertest';
import { GetAllHabitationControllerSeeder, getExpectedResponse } from './__mocks__/get-all-habitation.controller.mock';

describe('GetAllHabitationController (e2e)', () => {
  let app: INestApplication;
  let seeder: GetAllHabitationControllerSeeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HabitationModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    seeder = new GetAllHabitationControllerSeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('[SUCCESS] [200] [GET] /api/habitation - should be return a empty array', async () => {
    return request(app.getHttpServer()).get('/habitation').expect(HttpStatus.OK).expect([]);
  });

  it('[SUCCESS] [200] [GET] /api/habitation - should be return a formatted response', async () => {
    await seeder.seed();

    const { status, body } = await request(app.getHttpServer()).get('/habitation');

    expect(body).toEqual(getExpectedResponse());
    expect(status).toEqual(HttpStatus.OK);
  });
});
