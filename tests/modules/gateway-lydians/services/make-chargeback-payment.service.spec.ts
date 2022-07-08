import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ServerError } from 'src/errors';
import { PaymentAlreadyChargebacked } from 'src/errors/payment-already-chargeback.error';
import { LogPaymentTypeStatusEnum } from 'src/modules/common/constants';
import {
  ChargebackPaymentRepository,
  PaymentLogRepository,
  SavePaymentRepository,
} from 'src/modules/gateway-lydians/repositories';
import { MakeChargebackPaymentService } from 'src/modules/gateway-lydians/services';
import {
  errorAlreadyChargebacked,
  idPayment,
  request,
  response,
} from './__mocks__/make-chargeback-payment.service.mock';
import { idLog } from './__mocks__/make-payment-with-log.service.mock';

describe('MakeChargebackPaymentService - Unit', () => {
  let makeChargebackPaymentService: MakeChargebackPaymentService;
  let savePaymentRepository: SavePaymentRepository;
  let paymentLogRepository: PaymentLogRepository;
  let chargebackPaymentRepository: ChargebackPaymentRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MakeChargebackPaymentService,
        {
          provide: SavePaymentRepository,
          useFactory: () => ({
            savePayment: jest.fn(),
          }),
        },
        MakeChargebackPaymentService,
        {
          provide: PaymentLogRepository,
          useFactory: () => ({
            saveLog: jest.fn(),
          }),
        },
        MakeChargebackPaymentService,
        {
          provide: ChargebackPaymentRepository,
          useFactory: () => ({
            chargebackPayment: jest.fn(),
          }),
        },
      ],
    }).compile();

    makeChargebackPaymentService = app.get<MakeChargebackPaymentService>(MakeChargebackPaymentService);
    savePaymentRepository = app.get<SavePaymentRepository>(SavePaymentRepository);
    paymentLogRepository = app.get<PaymentLogRepository>(PaymentLogRepository);
    chargebackPaymentRepository = app.get<ChargebackPaymentRepository>(ChargebackPaymentRepository);
  });

  it('Success - Should make chargeback and save log', async () => {
    jest.spyOn(savePaymentRepository, 'savePayment').mockResolvedValue(idPayment);
    jest.spyOn(paymentLogRepository, 'saveLog').mockResolvedValue(idLog);
    jest.spyOn(chargebackPaymentRepository, 'chargebackPayment').mockResolvedValue(response);

    const paymentId = await makeChargebackPaymentService.makeChargeBackPayment(request);

    expect(paymentId).toEqual(idPayment);
    expect(paymentLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({ type: LogPaymentTypeStatusEnum.CHARGEBACK }),
    );
  });

  it('Error - Should error Payment Already Chargebacked', async () => {
    jest.spyOn(chargebackPaymentRepository, 'chargebackPayment').mockRejectedValue(errorAlreadyChargebacked);
    jest.spyOn(paymentLogRepository, 'saveLog').mockResolvedValue(idLog);

    await expect(makeChargebackPaymentService.makeChargeBackPayment(request)).rejects.toThrow(
      PaymentAlreadyChargebacked,
    );
    expect(paymentLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({ type: LogPaymentTypeStatusEnum.CHARGEBACK }),
    );
  });

  it('Error - Should error generic - ServerError', async () => {
    jest.spyOn(chargebackPaymentRepository, 'chargebackPayment').mockRejectedValue(new Error());
    jest.spyOn(paymentLogRepository, 'saveLog');

    await expect(makeChargebackPaymentService.makeChargeBackPayment(request)).rejects.toThrow(ServerError);

    expect(paymentLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        type: LogPaymentTypeStatusEnum.CHARGEBACK,
      }),
    );
  });
});
