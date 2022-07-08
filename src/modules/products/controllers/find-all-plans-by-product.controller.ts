import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FindAllPlansByProductService, FindAllPlansByProductServiceResponse } from '../services';
import { FindAllPlansByProductControllerResponseDTO } from './dtos';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class FindAllPlansByProductController {
  constructor(private readonly findAllPlansByProductService: FindAllPlansByProductService) {}

  @Get('/:id/plans')
  @ApiOperation({
    summary: 'Lista todos os planos do produto selecionado',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id do produto',
    type: Number,
  })
  @ApiOkResponse({
    type: FindAllPlansByProductControllerResponseDTO,
    isArray: true,
  })
  public async findAllPlansByProduct(
    @Param('id') id_product: number,
  ): Promise<FindAllPlansByProductControllerResponseDTO[]> {
    const plans = await this.findAllPlansByProductService.findAllPlans(id_product);

    return this.makeResponse(plans);
  }

  private makeResponse(plans: FindAllPlansByProductServiceResponse): FindAllPlansByProductControllerResponseDTO[] {
    return plans.map((p) => new FindAllPlansByProductControllerResponseDTO().toDTO(p));
  }
}
