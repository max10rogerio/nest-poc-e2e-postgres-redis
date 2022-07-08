import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ResidentialParamsRequired } from 'src/errors';
import { DatabaseModule } from 'src/modules/database/database.module';
import { MakePaymentRepository } from 'src/modules/gateway-lydians/repositories';
import { PolicyModule } from 'src/modules/policy/policy.module';
import { PolicySaveResidentialDataService } from 'src/modules/policy/services';
import { ProductTypeEnum } from 'src/modules/products/constants';
import * as request from 'supertest';
import { CreatePolicyDTOMock } from './dto/__mocks__/create-policy.dto.mock';
import {
  CreatePolicyControllerSeeder,
  makeGatewayPaymentResponseMock,
} from './__mocks__/create-policy.controller.mock';

jest.setTimeout(20000);

describe('CreatePolicyController - e2e', () => {
  let app: INestApplication;
  let seeder: CreatePolicyControllerSeeder;
  let policySaveResidentialDataService: PolicySaveResidentialDataService;
  let makePaymentRepository: MakePaymentRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    policySaveResidentialDataService = app.get<PolicySaveResidentialDataService>(PolicySaveResidentialDataService);
    makePaymentRepository = app.get<MakePaymentRepository>(MakePaymentRepository);

    jest.spyOn(makePaymentRepository, 'makePayment').mockResolvedValue(makeGatewayPaymentResponseMock());

    seeder = new CreatePolicyControllerSeeder();

    await seeder.truncate();
    await app.init();
  });

  afterEach(async () => {
    await seeder.truncate();
    await app.close();
  });

  it('[FAILURE] [400] [POST] - api/policy - should be return ResidentialParamsRequired', async () => {
    await seeder.seed(ProductTypeEnum.RESIDENTIAL);

    const payload = new CreatePolicyDTOMock().makeCompletePayload();

    delete payload.residential;

    const { body, status } = await request(app.getHttpServer()).post(`/policy`).send(payload);

    expect(status).toEqual(HttpStatus.BAD_REQUEST);
    expect(body).toEqual(new ResidentialParamsRequired().toJSON());
  });

  it('[SUCCESS] [201] [POST] - api/policy - should be SAVE a policy of type RESIDENTIAL', async () => {
    jest.spyOn(policySaveResidentialDataService, 'save');

    await seeder.seed(ProductTypeEnum.RESIDENTIAL);

    const payload = new CreatePolicyDTOMock().makeCompletePayload();

    const response = await request(app.getHttpServer()).post(`/policy`).send(payload);
    const { status, text } = response;

    expect(status).toEqual(HttpStatus.CREATED);
    expect(policySaveResidentialDataService.save).toHaveBeenCalled();
    expect(text).toEqual('1');
  });

  it('[SUCCESS] [201] [POST] - api/policy - should be SAVE a policy of type DEFAULT', async () => {
    jest.spyOn(policySaveResidentialDataService, 'save');

    await seeder.seed(ProductTypeEnum.DEFAULT);

    const payload = new CreatePolicyDTOMock().makeCompletePayload();

    const response = await request(app.getHttpServer()).post(`/policy`).send(payload);
    const { text, status } = response;

    expect(status).toEqual(HttpStatus.CREATED);
    expect(policySaveResidentialDataService.save).not.toHaveBeenCalled();
    expect(text).toEqual('1');
  });
});
