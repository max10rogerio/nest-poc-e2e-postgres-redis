import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Env } from 'src/config';
import { PolicyNotFound } from 'src/errors';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PolicyModule } from 'src/modules/policy/policy.module';
import * as request from 'supertest';
import { FindPolicyByIdControllerSeeder } from './__mocks__/find-policy-by-id.controller.mock';

describe('FindPolicyByIdController - e2e', () => {
  let app: INestApplication;
  let seeder: FindPolicyByIdControllerSeeder;
  let configService: ConfigService<Env>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = app.get<ConfigService>(ConfigService);

    seeder = new FindPolicyByIdControllerSeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('[FAILURE] [404] /policy/1 - shoudl return an error when not found policy by id', async () => {
    const response = await request(app.getHttpServer()).get(`/policy/1`);
    const { status, body } = response;

    expect(status).toEqual(HttpStatus.NOT_FOUND);
    expect(body).toEqual(new PolicyNotFound(1).toJSON());
  });

  it('[SUCCESS] [200] /policy/1 - should be return a policy details', async () => {
    await seeder.seed();

    const response = await request(app.getHttpServer()).get(`/policy/1`);
    const { status, body } = response;

    expect(status).toEqual(HttpStatus.OK);
    expect(body).toEqual(seeder.getResponse(configService.get('domain')));
  });
});
