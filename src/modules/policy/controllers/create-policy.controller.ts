import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePolicyService } from '../services';
import { CreatePolicyParamsDTO } from './dto';

@Controller('policy')
@ApiTags('Policy')
@ApiBearerAuth()
export class CreatePolicyController {
  constructor(private readonly createPolicyService: CreatePolicyService) {}

  @ApiCreatedResponse({
    type: Number,
    description: 'Retorna o ID da apólice gerada',
  })
  @ApiOperation({
    summary: 'Gera uma nova apólice',
  })
  @Post()
  public async createPolicy(@Body() body: CreatePolicyParamsDTO): Promise<number> {
    try {
      const params = new CreatePolicyParamsDTO().toParams(body);
      const newPolicy = await this.createPolicyService.createPolicy(params);

      return newPolicy.policyId;
    } catch (error) {
      throw error;
    }
  }
}
