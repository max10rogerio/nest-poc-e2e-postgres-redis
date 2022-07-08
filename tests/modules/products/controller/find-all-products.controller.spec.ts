import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from 'src/modules/config/config.module';
import { FindAllProductsController } from 'src/modules/products/controllers';
import { FindAllProductsControllerResponseDTO } from 'src/modules/products/controllers/dtos';
import { FindAllProductsService } from 'src/modules/products/services';

describe('FindAllProductsController (Unit)', () => {
  let findAllProductsController: FindAllProductsController;
  let findAllProductsService: FindAllProductsService;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [FindAllProductsController],
      providers: [
        {
          provide: FindAllProductsService,
          useFactory: () => ({
            findAll: jest.fn(),
          }),
        },
      ],
    }).compile();

    findAllProductsService = app.get<FindAllProductsService>(FindAllProductsService);
    findAllProductsController = app.get<FindAllProductsController>(FindAllProductsController);
    configService = app.get<ConfigService>(ConfigService);
  });

  it('should return a formated responde', async () => {
    const mock = {
      id: 1,
      description: 'test',
      planMinPrizeValue: 20,
      plansQuantity: 1,
      icon: 'test.jpg',
      termsPDF: 'test.pdf',
    };

    const expected = new FindAllProductsControllerResponseDTO().toDTO(mock, configService.get('domain'));

    jest.spyOn(findAllProductsService, 'findAll').mockResolvedValue([mock]);

    await expect(findAllProductsController.findAll()).resolves.toEqual([expected]);
  });
});
