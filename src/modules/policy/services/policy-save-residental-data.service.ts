import { Injectable } from '@nestjs/common';
import { CreateAddressService, CreateAddressServiceParams } from 'src/modules/address/services';
import { CreatePropertyRepository, CreateResidentialPolicyRepository } from '../repositories';

@Injectable()
export class PolicySaveResidentialDataService {
  constructor(
    private readonly createPropertyRepository: CreatePropertyRepository,
    private readonly createResidentialPolicyRepository: CreateResidentialPolicyRepository,
    private readonly createAddressService: CreateAddressService,
  ) {}

  public async save(
    params: PolicySaveResidentialDataServiceParams,
    policyId: number,
    insuredAddressId?: number,
  ): Promise<void> {
    const { address, ...residential } = params;

    let addressId = insuredAddressId;

    if (address) {
      addressId = await this.createAddressService.create(address).then((v) => v.id);
    }

    const property = await this.createPropertyRepository.create({
      constructionTypeId: residential.constructionId,
      propertyTypeId: residential.propertyId,
      housingTypeId: residential.habitationId,
    });

    await this.createResidentialPolicyRepository.create({
      addressId,
      policyId,
      propertyId: property.id,
    });
  }
}

export type PolicySaveResidentialDataServiceParams = {
  habitationId: number;
  constructionId: number;
  propertyId: number;
  address?: CreateAddressServiceParams;
};
