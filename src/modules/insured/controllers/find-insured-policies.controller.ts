import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Env } from 'src/config';
import { FindInsuredPoliciesService } from '../services';
import { FindInsuredPoliciesControllerParamsDTO, FindInsuredPoliciesControllerResponseDTO } from './dto';

@Controller('insured')
@ApiTags('Insured')
@ApiBearerAuth()
export class FindInsuredPoliciesController {
  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly findInsuredPoliciesService: FindInsuredPoliciesService,
  ) {}

  @ApiOperation({ summary: 'Retornas as apolices contratadas de um segurado pelo CPF' })
  @Get(':cpf/policies')
  async find(
    @Param() params: FindInsuredPoliciesControllerParamsDTO,
  ): Promise<FindInsuredPoliciesControllerResponseDTO[]> {
    const policies = await this.findInsuredPoliciesService.find(params.cpf);

    return new FindInsuredPoliciesControllerResponseDTO().toDTO(policies, this.configService.get('domain'));
  }
}
