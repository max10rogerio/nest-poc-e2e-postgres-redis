import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Env } from 'src/config';
import { PlanNotFound } from 'src/errors';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PlansModule } from 'src/modules/plans/plans.module';
import * as request from 'supertest';
import { expected, FindPlanDetailsByIdSeeder } from './__mocks__/find-plan-details-by-id.controller.mock';

describe('FindPlanDetailsByIdController (e2e)', () => {
  let app: INestApplication;
  let seeder: FindPlanDetailsByIdSeeder;
  let configService: ConfigService<Env>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PlansModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    configService = app.get<ConfigService>(ConfigService);

    seeder = new FindPlanDetailsByIdSeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('[SUCCESS] [200] [GET] /plans/:id - should return formated object', async () => {
    await seeder.seed();

    const { body, status } = await request(app.getHttpServer()).get(`/plans/1`);

    expect(body).toEqual(expected(configService.get('domain')));
    expect(status).toEqual(HttpStatus.OK);
  });

  it('[FAILURE] [404] /plans/:id - should return error when not found plan by id', async () => {
    await seeder.seed();

    const { body, status } = await request(app.getHttpServer()).get(`/plans/123`);

    expect(status).toEqual(HttpStatus.NOT_FOUND);
    expect(body).toEqual(new PlanNotFound(123).toJSON());
  });
});
