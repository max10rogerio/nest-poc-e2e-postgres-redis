import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '../address/address.module';
import {
  AddressEntity,
  AgentEntity,
  CoverageEntity,
  InstallmentEntity,
  InsuredEntity,
  PlanCoverageEntity,
  PlanEntity,
  PolicyEntity,
  PolicyResidentialEntity,
  ProductAgentEntity,
  ProductEntity,
  PropertyEntity,
} from '../database/models';
import { GatewayLydiansModule } from '../gateway-lydians/gateway-lydians.module';
import { InsuredModule } from '../insured/insured.module';
import { LotteryModule } from '../lottery/loterry.module';
import { PDFModule } from '../pdf/pdf.module';
import { PlansModule } from '../plans/plans.module';
import { MailQueueModule, SendPolicyCancellationEmailPublisher } from '../queue/mail';
import {
  CancelPolicyController,
  CreatePolicyController,
  FindPolicyByIdController,
  LoadPolicyPdfByIdController,
} from './controllers';
import {
  CancelInstallmentRepository,
  CancelPolicyRepository,
  CreateInstallmentRepository,
  CreatePolicyRepository,
  CreatePropertyRepository,
  CreateResidentialPolicyRepository,
  FindLastInstallmentPaidRepository,
  FindPolicyByIdRepository,
  FindTicketReportDataRepository,
  GetAgentByKeyRepository,
  GetContractNumberAgentRepository,
  SaveTicketPdfPathPolicyRepository,
} from './repositories';
import {
  CancelPolicyService,
  CreateInstallmentService,
  CreatePolicyService,
  CreateTicketNumberService,
  FindPolicyByIdService,
  FindTicketReportDataService,
  LoadStreamTicketPolicyService,
  PolicyCreateInstallmentsService,
  PolicySaveOrLoadInsuredService,
  PolicySaveResidentialDataService,
  SaveTicketPdfPathPolicyService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PolicyEntity,
      AgentEntity,
      InstallmentEntity,
      PropertyEntity,
      PolicyResidentialEntity,
      ProductAgentEntity,
      InsuredEntity,
      AddressEntity,
      PlanCoverageEntity,
      CoverageEntity,
      PlanEntity,
      ProductEntity,
    ]),
    LotteryModule,
    GatewayLydiansModule,
    PlansModule,
    InsuredModule,
    AddressModule,
    PDFModule,
    MailQueueModule,
  ],
  providers: [
    CreatePolicyService,
    GetAgentByKeyRepository,
    CreatePolicyRepository,
    CreateTicketNumberService,
    CreateInstallmentService,
    CreateInstallmentRepository,
    CancelPolicyService,
    CancelPolicyRepository,
    CancelInstallmentRepository,
    CreatePropertyRepository,
    CreateResidentialPolicyRepository,
    PolicySaveOrLoadInsuredService,
    PolicyCreateInstallmentsService,
    PolicySaveResidentialDataService,
    FindPolicyByIdRepository,
    FindPolicyByIdService,
    SendPolicyCancellationEmailPublisher,
    GetContractNumberAgentRepository,
    SaveTicketPdfPathPolicyRepository,
    SaveTicketPdfPathPolicyService,
    LoadStreamTicketPolicyService,
    FindTicketReportDataRepository,
    FindTicketReportDataService,
    FindLastInstallmentPaidRepository,
  ],
  controllers: [CreatePolicyController, FindPolicyByIdController, LoadPolicyPdfByIdController, CancelPolicyController],
})
export class PolicyModule {}
