import { ApiProperty } from '@nestjs/swagger';
import { makeFileURL } from 'src/config';
import { FindAllProductsServiceResponse } from '../../services';

export class FindAllProductsControllerResponseDTO {
  @ApiProperty({
    description: 'Id do produto',
  })
  id: number;

  @ApiProperty({
    description: 'Descrição do produto',
  })
  description: string;

  @ApiProperty({
    description: 'Ícone do produto',
    nullable: true,
  })
  icon: string;

  @ApiProperty({
    description: 'PDF com os Termos e condições gerais do seguro',
    nullable: true,
  })
  terms_pdf: string;

  @ApiProperty({
    description: 'Preço inicial dos planos',
  })
  inicial_price: number;

  @ApiProperty({
    description: 'Indica se esse produtos tem vários planos',
  })
  has_multiple_plans: boolean;

  constructor(params?: Partial<FindAllProductsControllerResponseDTO>) {
    Object.assign(this, params);
  }

  public toDTO(params: FindAllProductsServiceResponse[number], domain: string): FindAllProductsControllerResponseDTO {
    return new FindAllProductsControllerResponseDTO({
      id: params.id,
      icon: makeFileURL(params.icon, domain),
      description: params.description,
      inicial_price: params.planMinPrizeValue,
      has_multiple_plans: params.plansQuantity > 1,
      terms_pdf: makeFileURL(params.termsPDF, domain),
    });
  }
}
