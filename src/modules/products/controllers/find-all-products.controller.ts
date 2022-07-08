import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Env } from 'src/config';
import { FindAllProductsService, FindAllProductsServiceResponse } from '../services';
import { FindAllProductsControllerResponseDTO } from './dtos';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class FindAllProductsController {
  constructor(
    private readonly findAllProductsService: FindAllProductsService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todos os produtos',
  })
  @ApiOkResponse({
    type: FindAllProductsControllerResponseDTO,
    isArray: true,
  })
  public async findAll(): Promise<FindAllProductsControllerResponseDTO[]> {
    const products = await this.findAllProductsService.findAll();

    return this.makeResponse(products);
  }

  private makeResponse(products: FindAllProductsServiceResponse): FindAllProductsControllerResponseDTO[] {
    return products.map((p) => new FindAllProductsControllerResponseDTO().toDTO(p, this.configService.get('domain')));
  }
}
