import uploadFeature from '@adminjs/upload';
import { ResourceWithOptions } from 'adminjs';
import {
  AddressEntity,
  AgentEntity,
  AgentTypeEntity,
  CoverageEntity,
  CoverageTypeEntity,
  HabitationEntity,
  HabitationTypeEntity,
  InstallmentEntity,
  InsuredEntity,
  LogPaymentsEntity,
  LotteryConfigEntity,
  PaymentsEntity,
  PlanCoverageEntity,
  PlanEntity,
  PolicyEntity,
  PolicyResidentialEntity,
  ProductAgentEntity,
  ProductEntity,
  PropertyEntity,
} from '../database/models';
import { AdminUploadProvider } from './admin.provider';
import { makeUploadResourcePath } from './utils';

const PlanResource: ResourceWithOptions = {
  resource: PlanEntity,
  options: {
    properties: {
      description: {
        type: 'textarea',
        isTitle: true,
      },
      deletedAt: {
        isVisible: false,
      },
    },
    listProperties: ['productId', 'description', 'prizeValue'],
    sort: {
      direction: 'asc',
      sortBy: 'productId',
    },
  },
};

const ProductResource: ResourceWithOptions = {
  resource: ProductEntity,
  features: [
    uploadFeature({
      provider: new AdminUploadProvider(),
      uploadPath: makeUploadResourcePath('products'),
      properties: {
        key: 'icon',
        mimeType: 'mimeType',
        file: 'icone',
      },
    }),
    uploadFeature({
      provider: new AdminUploadProvider(),
      uploadPath: makeUploadResourcePath('products'),
      properties: {
        key: 'termsPDF',
        mimeType: 'application/pdf',
        file: 'termos_pdf',
        filePath: 'termos_pdf_path',
        filesToDelete: 'termos_pdf_delete',
      },
    }),
  ],
  options: {
    properties: {
      description: {
        isTitle: true,
      },
      deletedAt: {
        isVisible: false,
      },
    },
  },
};

const CoverageTypeResource: ResourceWithOptions = {
  resource: CoverageTypeEntity,
  options: {
    properties: {
      description: {
        isTitle: true,
      },
      deletedAt: {
        isVisible: false,
      },
    },
  },
};

const CoverageResource: ResourceWithOptions = {
  resource: CoverageEntity,
  features: [
    uploadFeature({
      provider: new AdminUploadProvider(),
      uploadPath: makeUploadResourcePath('coverages'),
      properties: {
        key: 'icon',
        mimeType: 'mimeType',
      },
    }),
  ],
  options: {
    listProperties: ['icon', 'title', 'coverageTypeId'],
    sort: {
      direction: 'asc',
      sortBy: 'coverageTypeId',
    },
    properties: {
      deletedAt: {
        isVisible: false,
      },
    },
  },
};

const PlanCoverageResource: ResourceWithOptions = {
  resource: PlanCoverageEntity,
  options: {
    listProperties: ['planId', 'coverageId', 'capitalValue'],
    sort: {
      direction: 'asc',
      sortBy: 'planId',
    },
    properties: {
      deletedAt: {
        isVisible: false,
      },
    },
  },
};

const AgentResource: ResourceWithOptions = {
  resource: AgentEntity,
  options: {},
};

const LotteryConfigResource: ResourceWithOptions = {
  resource: LotteryConfigEntity,
  options: {},
};

const PolicyResource: ResourceWithOptions = {
  resource: PolicyEntity,
  options: {},
};

const HabitationTypeResource: ResourceWithOptions = {
  resource: HabitationTypeEntity,
  options: {
    listProperties: ['key', 'description'],
    sort: {
      direction: 'asc',
      sortBy: 'description',
    },
    properties: {
      description: {
        isTitle: true,
        type: 'textarea',
      },
    },
  },
};

const HabitationResource: ResourceWithOptions = {
  resource: HabitationEntity,
  options: {
    listProperties: ['id', 'code', 'description', 'habitationTypeId'],
    sort: {
      direction: 'asc',
      sortBy: 'id',
    },
  },
};

const PaymentResource: ResourceWithOptions = {
  resource: PaymentsEntity,
  options: {
    listProperties: ['idLog', 'cpf', 'value'],
    sort: {
      direction: 'asc',
      sortBy: 'idLog',
    },
  },
};

const AgentTypeResource: ResourceWithOptions = {
  resource: AgentTypeEntity,
  options: {
    properties: {
      description: {
        isTitle: true,
      },
    },
  },
};

const LogPaymentResource: ResourceWithOptions = {
  resource: LogPaymentsEntity,
  options: {
    listProperties: ['cpf', 'value', 'createdAt', 'statusCode', 'request', 'response'],
    sort: {
      direction: 'asc',
      sortBy: 'createdAt',
    },
  },
};

const InsuredResource: ResourceWithOptions = {
  resource: InsuredEntity,
  options: {},
};

const InstallmentResource: ResourceWithOptions = {
  resource: InstallmentEntity,
  options: {},
};

const PropertyResource: ResourceWithOptions = {
  resource: PropertyEntity,
  options: {},
};

const PolicyResidentialResource: ResourceWithOptions = {
  resource: PolicyResidentialEntity,
  options: {},
};

const AddressResource: ResourceWithOptions = {
  resource: AddressEntity,
  options: {},
};

const ProductAgentResource: ResourceWithOptions = {
  resource: ProductAgentEntity,
  options: {},
};

export const resources: ResourceWithOptions[] = [
  ProductResource,
  PlanResource,
  PlanCoverageResource,
  CoverageResource,
  InsuredResource,
  AddressResource,
  InstallmentResource,
  PropertyResource,
  PolicyResidentialResource,
  AgentResource,
  PolicyResource,
  InstallmentResource,
  PropertyResource,
  PolicyResidentialResource,
  LotteryConfigResource,
  AgentTypeResource,
  CoverageTypeResource,
  HabitationTypeResource,
  HabitationResource,
  LogPaymentResource,
  PaymentResource,
  ProductAgentResource,
];
