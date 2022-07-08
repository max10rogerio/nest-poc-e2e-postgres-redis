import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from '../database/models';
import { FindPlanDetailsByIdController } from './controllers';
import { FindPlanDetailsByIdRepository } from './repositories';
import { FindPlanDetailsByIdService } from './services';

@Module({
  controllers: [FindPlanDetailsByIdController],
  providers: [FindPlanDetailsByIdRepository, FindPlanDetailsByIdService],
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  exports: [FindPlanDetailsByIdService],
})
export class PlansModule {}
