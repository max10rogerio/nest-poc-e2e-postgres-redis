import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity, ProductEntity } from '../database/models';
import { FindAllPlansByProductController, FindAllProductsController } from './controllers';
import { FindAllPlansByProduct, FindAllProductsWithLowestPlanPrice } from './repositories';
import { FindAllPlansByProductService, FindAllProductsService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, PlanEntity])],
  controllers: [FindAllProductsController, FindAllPlansByProductController],
  providers: [
    FindAllProductsWithLowestPlanPrice,
    FindAllProductsService,
    FindAllPlansByProductService,
    FindAllPlansByProduct,
  ],
})
export class ProductsModule {}
