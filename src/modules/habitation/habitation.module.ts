import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitationEntity, HabitationTypeEntity } from '../database/models';
import { GetAllHabitationController } from './controllers';
import { GetAllHabitationRepository } from './repositories';
import { GetAllHabitationService } from './services';

@Module({
  controllers: [GetAllHabitationController],
  providers: [GetAllHabitationRepository, GetAllHabitationService],
  imports: [TypeOrmModule.forFeature([HabitationEntity, HabitationTypeEntity])],
})
export class HabitationModule {}
