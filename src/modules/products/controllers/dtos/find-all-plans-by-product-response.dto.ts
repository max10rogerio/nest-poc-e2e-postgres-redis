import { ApiProperty } from '@nestjs/swagger';
import { FindAllPlansByProductServiceResponse } from '../../services';

export class FindAllPlansByProductControllerResponseDTO {
  @ApiProperty({
    description: 'Id do plano',
  })
  id: number;

  @ApiProperty({
    description: 'Id do produto',
  })
  product_id: number;

  @ApiProperty({
    description: 'Descrição do plano',
  })
  description: string;

  @ApiProperty({
    description: 'Resumo do plano',
  })
  summary: string;

  @ApiProperty({
    description: 'Preço do plano',
  })
  plan_price: number;

  constructor(params?: Partial<FindAllPlansByProductControllerResponseDTO>) {
    Object.assign(this, params);
  }

  toDTO(params: FindAllPlansByProductServiceResponse[number]): FindAllPlansByProductControllerResponseDTO {
    return new FindAllPlansByProductControllerResponseDTO({
      id: params.id,
      product_id: params.productId,
      description: params.description,
      summary: params.summary,
      plan_price: params.prizeValue,
    });
  }
}
