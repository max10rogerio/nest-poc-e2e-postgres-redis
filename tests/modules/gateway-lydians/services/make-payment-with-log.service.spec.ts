import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountNotFound, InsufficientFunds, ServerError } from 'src/errors';
import { MakePaymentRepository, PaymentLogRepository } from 'src/modules/gateway-lydians/repositories';
import { MakePaymentWithLogService } from 'src/modules/gateway-lydians/services';
import {
  bodyResponse,
  errorAccountNotFound,
  errorInsufficientFunds,
  idLog,
  makePaymentResponse,
  paymentRequest,
} from './__mocks__/make-payment-with-log.service.mock';

describe('MakePaymentWithLogService (Unit)', () => {
  let makePaymentWithLogService: MakePaymentWithLogService;
  let makePaymentRepository: MakePaymentRepository;
  let paymentLogRepository: PaymentLogRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MakePaymentWithLogService,
        {
          provide: MakePaymentRepository,
          useFactory: () => ({
            makePayment: jest.fn(),
            makeBody: jest.fn(),
          }),
        },
        MakePaymentWithLogService,
        {
          provide: PaymentLogRepository,
          useFactory: () => ({
            saveLog: jest.fn(),
          }),
        },
      ],
    }).compile();

    makePaymentWithLogService = app.get<MakePaymentWithLogService>(MakePaymentWithLogService);
    makePaymentRepository = app.get<MakePaymentRepository>(MakePaymentRepository);
    paymentLogRepository = app.get<PaymentLogRepository>(PaymentLogRepository);
  });

  it('Success - Should make payment and save log', async () => {
    jest.spyOn(makePaymentRepository, 'makePayment').mockResolvedValue(makePaymentResponse);
    jest.spyOn(makePaymentRepository, 'makeBody').mockReturnValue(bodyResponse);
    jest.spyOn(paymentLogRepository, 'saveLog').mockResolvedValue(idLog);

    const { idLog: idLogReturned } = await makePaymentWithLogService.makePayment(paymentRequest);

    expect(idLogReturned).toEqual(idLog);
  });

  it('Error - Should error InsufficientFunds', async () => {
    jest.spyOn(makePaymentRepository, 'makePayment').mockRejectedValue(errorInsufficientFunds);
    await expect(makePaymentWithLogService.makePayment(paymentRequest)).rejects.toThrow(InsufficientFunds);
  });

  it('Error - Should error AccountNotFound', async () => {
    jest.spyOn(makePaymentRepository, 'makePayment').mockRejectedValue(errorAccountNotFound);
    jest.spyOn(paymentLogRepository, 'saveLog');

    await expect(makePaymentWithLogService.makePayment(paymentRequest)).rejects.toThrow(AccountNotFound);

    expect(paymentLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: HttpStatus.BAD_REQUEST }),
    );
  });

  it('Error - Should error generic - ServerError', async () => {
    jest.spyOn(makePaymentRepository, 'makePayment').mockRejectedValue(new Error());
    jest.spyOn(paymentLogRepository, 'saveLog');

    await expect(makePaymentWithLogService.makePayment(paymentRequest)).rejects.toThrow(ServerError);

    expect(paymentLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR }),
    );
  });
});
