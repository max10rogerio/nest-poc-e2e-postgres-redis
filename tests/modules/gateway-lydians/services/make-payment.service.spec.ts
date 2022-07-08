import { Test, TestingModule } from '@nestjs/testing';
import { GatewayPaymentResponse, SavePaymentRepository } from 'src/modules/gateway-lydians/repositories';
import {
  MakePaymentService,
  MakePaymentServiceParams,
  MakePaymentWithLogResponse,
  MakePaymentWithLogService,
} from 'src/modules/gateway-lydians/services';

describe('MakePaymentService (Unit)', () => {
  let makePaymentService: MakePaymentService;
  let makePaymentWithLogService: MakePaymentWithLogService;
  let savePaymentRepository: SavePaymentRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MakePaymentService,
        {
          provide: MakePaymentWithLogService,
          useFactory: () => ({
            makePayment: jest.fn(),
          }),
        },
        MakePaymentService,
        {
          provide: SavePaymentRepository,
          useFactory: () => ({
            savePayment: jest.fn(),
          }),
        },
      ],
    }).compile();

    makePaymentService = app.get<MakePaymentService>(MakePaymentService);
    makePaymentWithLogService = app.get<MakePaymentWithLogService>(MakePaymentWithLogService);
    savePaymentRepository = app.get<SavePaymentRepository>(SavePaymentRepository);
  });

  it('should make a payment and return id_payment', async () => {
    const paymentRequest: MakePaymentServiceParams = {
      agency_code: 1,
      account_number: 1,
      cpf: '93098756071',
      description: 'Debit test',
      value: 9.9,
    };

    const payment: GatewayPaymentResponse = {
      application_name: 'API Seguros',
      created_at: undefined,
      http_status: '200',
      id: '1',
      request_id: '1',
      response: undefined,
      seq_lanc: 1,
      updated_at: undefined,
    };

    const paymentLogResponse: MakePaymentWithLogResponse = {
      idLog: 1,
      payment: payment,
    };

    const expected = { logId: 1, paymentId: 1, requestId: '1', transactionId: 1 };

    jest.spyOn(makePaymentWithLogService, 'makePayment').mockResolvedValue(paymentLogResponse);
    jest.spyOn(savePaymentRepository, 'savePayment').mockResolvedValue(expected.paymentId);

    await expect(makePaymentService.makePayment(paymentRequest)).resolves.toEqual(expected);
  });
});
