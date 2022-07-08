import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoadPolicyPdfByIdController } from 'src/modules/policy/controllers';
import { LoadStreamTicketPolicyService } from 'src/modules/policy/services';
import * as request from 'supertest';
import { Readable } from 'typeorm/platform/PlatformTools';

describe('LoadPolicyPdfByIdController - e2e', () => {
  let app: INestApplication;
  let loadStreamTicketPolicyService: LoadStreamTicketPolicyService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [LoadPolicyPdfByIdController],
      providers: [
        {
          provide: LoadStreamTicketPolicyService,
          useFactory: () => ({
            loadStream: jest.fn(),
          }),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    loadStreamTicketPolicyService = app.get<LoadStreamTicketPolicyService>(LoadStreamTicketPolicyService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('[SUCCESS] [200] /policy/:id/pdf - should be return a stream file from controller', async () => {
    jest
      .spyOn(loadStreamTicketPolicyService, 'loadStream')
      .mockImplementation(() => Promise.resolve(Readable.from(Buffer.from('test'))));

    const response = await request(app.getHttpServer()).get(`/policy/1/pdf`);

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toBeTruthy();
  }, 10000);
});
