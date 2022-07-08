import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import { PolicyCancelled } from 'src/errors';
import { PolicyStatusEnum } from 'src/modules/database/constants';
import { InstallmentEntity, InsuredEntity, PaymentsEntity, PlanEntity } from 'src/modules/database/models';
import { GetPaymentRepository } from 'src/modules/gateway-lydians/repositories';
import { MakeChargebackPaymentService } from 'src/modules/gateway-lydians/services';
import {
  CancelInstallmentRepository,
  CancelPolicyRepository,
  FindLastInstallmentPaidRepository,
} from 'src/modules/policy/repositories';
import {
  CancelPolicyService,
  CancelPolicyServiceResponse,
  FindPolicyByIdService,
  FindPolicyByIdServiceResponse,
} from 'src/modules/policy/services';
import { SendPolicyCancellationEmailPublisher } from 'src/modules/queue/mail';

describe('CancelPolicyService - Unit', () => {
  let cancelPolicyService: CancelPolicyService;

  let makeChargebackPaymentService: MakeChargebackPaymentService;
  let cancelPolicyRepository: CancelPolicyRepository;
  let cancelInstallmentRepository: CancelInstallmentRepository;
  let findPolicyByIdService: FindPolicyByIdService;
  let getPaymentRepository: GetPaymentRepository;
  let sendMailCancellationPolicy: SendPolicyCancellationEmailPublisher;
  let findLastInstallmentPaidRepository: FindLastInstallmentPaidRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CancelPolicyService,
        {
          provide: MakeChargebackPaymentService,
          useFactory: () => ({
            makeChargeBackPayment: jest.fn(),
          }),
        },
        CancelPolicyService,
        {
          provide: CancelPolicyRepository,
          useFactory: () => ({
            cancel: jest.fn(),
          }),
        },
        CancelPolicyService,
        {
          provide: CancelInstallmentRepository,
          useFactory: () => ({
            cancelInstallmentWithChargeback: jest.fn(),
            cancelInstallmentNoChargeback: jest.fn(),
          }),
        },
        CancelPolicyService,
        {
          provide: FindPolicyByIdService,
          useFactory: () => ({
            findById: jest.fn(),
          }),
        },
        CancelPolicyService,
        {
          provide: GetPaymentRepository,
          useFactory: () => ({
            getPaymentByInstallment: jest.fn(),
          }),
        },
        CancelPolicyService,
        {
          provide: SendPolicyCancellationEmailPublisher,
          useFactory: () => ({
            send: jest.fn(),
          }),
        },
        CancelPolicyService,
        {
          provide: FindLastInstallmentPaidRepository,
          useFactory: () => ({
            findByPolicyId: jest.fn(),
          }),
        },
      ],
    }).compile();

    cancelPolicyService = app.get<CancelPolicyService>(CancelPolicyService);

    makeChargebackPaymentService = app.get<MakeChargebackPaymentService>(MakeChargebackPaymentService);
    cancelPolicyRepository = app.get<CancelPolicyRepository>(CancelPolicyRepository);
    cancelInstallmentRepository = app.get<CancelInstallmentRepository>(CancelInstallmentRepository);
    findPolicyByIdService = app.get<FindPolicyByIdService>(FindPolicyByIdService);
    getPaymentRepository = app.get<GetPaymentRepository>(GetPaymentRepository);
    sendMailCancellationPolicy = app.get<SendPolicyCancellationEmailPublisher>(SendPolicyCancellationEmailPublisher);
    findLastInstallmentPaidRepository = app.get<FindLastInstallmentPaidRepository>(FindLastInstallmentPaidRepository);
  });

  it('Error - Policy already cancelled ', async () => {
    const policyCancelled: Partial<FindPolicyByIdServiceResponse> = {
      status: PolicyStatusEnum.CANCELLED,
    };

    jest.spyOn(findPolicyByIdService, 'findById').mockResolvedValue(policyCancelled as FindPolicyByIdServiceResponse);

    expect(cancelPolicyService.cancelPolicy(1)).rejects.toThrow(PolicyCancelled);
  });

  it('Success - Policy cancelled with chargeback ', async () => {
    const installment: Partial<InstallmentEntity> = {
      paymentId: 1,
    };
    const insured: Partial<InsuredEntity> = {
      cpf: '12332112314',
      name: 'Name of Insured',
    };

    const payment: Partial<PaymentsEntity> = {
      idLydians: '165d77fb-4851-45a4-8dc3-1a6502a051e1',
    };

    const plan: Partial<PlanEntity> = {
      description: 'Plan name',
    };

    const policy: Partial<FindPolicyByIdServiceResponse> = {
      id: 1,
      status: PolicyStatusEnum.ISSUED,
      ticket: '123',
      insured: insured as InsuredEntity,
      installment: installment as InstallmentEntity,
      plan: plan as PlanEntity,
      startDate: dayjs().add(-5, 'days').toDate(),
      endDate: dayjs().add(365, 'days').toDate(),
      coverageEndDate: dayjs().add(365, 'days').toDate(),
    };

    const policyResult: CancelPolicyServiceResponse = {
      id: 1,
      status: PolicyStatusEnum.CANCELLED,
      cancellationDate: new Date(),
      coverageEndDate: policy.coverageEndDate,
    };

    jest.spyOn(findPolicyByIdService, 'findById').mockResolvedValue(policy as FindPolicyByIdServiceResponse);
    jest.spyOn(getPaymentRepository, 'getPaymentByInstallment').mockResolvedValue(payment as PaymentsEntity);
    jest.spyOn(cancelPolicyRepository, 'cancel').mockResolvedValue(policyResult);

    await expect(cancelPolicyService.cancelPolicy(1)).resolves.toBe(policyResult);
    expect(getPaymentRepository.getPaymentByInstallment).toHaveBeenCalled();
    expect(makeChargebackPaymentService.makeChargeBackPayment).toHaveBeenCalled();
    expect(cancelInstallmentRepository.cancelInstallmentWithChargeback).toHaveBeenCalled();
    expect(sendMailCancellationPolicy.send).toHaveBeenCalled();
  });

  it('Success - Policy cancelled NO chargeback ', async () => {
    const policy: Partial<FindPolicyByIdServiceResponse> = {
      id: 1,
      status: PolicyStatusEnum.ISSUED,
      startDate: dayjs().add(-15, 'days').toDate(),
      endDate: dayjs().add(365, 'days').toDate(),
      coverageEndDate: dayjs().add(365, 'days').toDate(),
    };

    const lastInstallmentPaid: Partial<InstallmentEntity> = {
      dueDate: new Date().toDateString(),
    };

    const policyResult: CancelPolicyServiceResponse = {
      id: 1,
      status: PolicyStatusEnum.CANCELLED,
      cancellationDate: new Date(),
      coverageEndDate: dayjs(lastInstallmentPaid.dueDate).add(1, 'month').toDate(),
    };

    jest.spyOn(findPolicyByIdService, 'findById').mockResolvedValue(policy as FindPolicyByIdServiceResponse);
    jest.spyOn(cancelPolicyRepository, 'cancel').mockResolvedValue(policyResult);
    jest
      .spyOn(findLastInstallmentPaidRepository, 'findByPolicyId')
      .mockResolvedValue(lastInstallmentPaid as InstallmentEntity);

    await expect(cancelPolicyService.cancelPolicy(1)).resolves.toBe(policyResult);
    expect(cancelInstallmentRepository.cancelInstallmentNoChargeback).toHaveBeenCalled();
    expect(cancelPolicyRepository.cancel).toHaveBeenCalled();
  });
});
