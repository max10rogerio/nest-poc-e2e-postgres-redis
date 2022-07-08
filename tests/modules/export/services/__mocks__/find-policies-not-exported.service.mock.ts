import { PolicyStatusEnum } from 'src/modules/database/constants/policy-status.constant';
import { PolicyEntity } from 'src/modules/database/models';
import { FindPoliciesNotExportedRepositoryResponse } from 'src/modules/export/repositories/find-policies-not-exported.repository';

export const policyNotExported: Partial<PolicyEntity> = {
  id: 1,
  agentId: 1,
  ticket: '1',
  luckNumber: 1,
  planId: 1,
  insuredId: 1,
  status: PolicyStatusEnum.ISSUED,
  totalValue: 9.9,
  liquidValue: 8.9,
  iofValue: 1,
  addressId: 1,
};

export const policiesNotExportedMock: FindPoliciesNotExportedRepositoryResponse = [policyNotExported as PolicyEntity];
