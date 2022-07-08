import { ApiProperty } from '@nestjs/swagger';
import { makeFileURL } from 'src/config';
import { ProductTypeEnum } from 'src/modules/products/constants';
import { FindPlanDetailsByIdServiceResponse } from '../../services';

class CoverageInfosDTO {
  @ApiProperty({ nullable: true })
  icon: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  capital_value: number;

  @ApiProperty()
  general_text: string;

  @ApiProperty()
  capital_text: string;

  @ApiProperty()
  summary_text: string;

  @ApiProperty()
  shortage_text: string;

  @ApiProperty()
  franchise_text: string;
}

export class CoveragesDTO {
  @ApiProperty()
  key: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    type: CoverageInfosDTO,
    isArray: true,
  })
  values: CoverageInfosDTO[];
}

export class ProductDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  terms_pdf: string;

  @ApiProperty()
  type: ProductTypeEnum;
}

export class FindPlanDetailsDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  prize_value: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  summary: string;

  @ApiProperty({
    type: CoveragesDTO,
    isArray: true,
  })
  coverages: CoveragesDTO[];

  @ApiProperty()
  product: ProductDTO;

  public toDTO(params: FindPlanDetailsByIdServiceResponse, domain: string): FindPlanDetailsDTO {
    const dto = new FindPlanDetailsDTO();

    dto.id = params.id;
    dto.prize_value = params.prizeValue;
    dto.description = params.description;
    dto.summary = params.summary;

    const product = new ProductDTO();

    product.id = params.product.id;
    product.description = params.product.description;
    product.terms_pdf = makeFileURL(params.product.termsPDF, domain);
    product.type = params.product.type;

    dto.product = product;
    dto.coverages = this.makeCoverages(params, domain);

    return dto;
  }

  private makeCoverages(params: FindPlanDetailsByIdServiceResponse, domain: string): CoveragesDTO[] {
    const coverages = params.planCoverage.reduce<CoveragesDTO[]>((result, planCoverage) => {
      const { key, description } = planCoverage.coverage.coverageType;

      /* jest coverage does not recognize that this line is tested */
      /* istanbul ignore next */
      let ref = result.find((value) => value.key === key);
      const isNewRef = !ref;

      if (isNewRef) {
        const coveragesDto = new CoveragesDTO();

        coveragesDto.description = description;
        coveragesDto.key = key;
        coveragesDto.values = [];

        ref = coveragesDto;
      }

      const item = new CoverageInfosDTO();

      item.icon = makeFileURL(planCoverage.coverage.icon, domain);
      item.title = planCoverage.coverage.title;
      item.capital_value = planCoverage.capitalValue;
      item.capital_text = planCoverage.capitalText;
      item.general_text = planCoverage.generalText;
      item.summary_text = planCoverage.summaryText;
      item.shortage_text = planCoverage.shortageText;
      item.franchise_text = planCoverage.franchiseText;

      ref.values.push(item);

      if (isNewRef) result.push(ref);

      return result;
    }, []);

    return coverages;
  }
}
