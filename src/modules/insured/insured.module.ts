import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { AddressEntity, InsuredEntity, PolicyEntity } from '../database/models';
import { FindInsuredPoliciesController } from './controllers';
import { CreateInsuredRepository, FindInsuredByCPFRepository, FindInsuredPoliciesRepository } from './repositories';
import { CreateInsuredService, FindInsuredByCPFService, FindInsuredPoliciesService } from './services';

const insuredRepositories = TypeOrmModule.forFeature([AddressEntity, InsuredEntity, PolicyEntity]);

@Module({
  imports: [insuredRepositories, ConfigModule],
  controllers: [FindInsuredPoliciesController],
  providers: [
    CreateInsuredRepository,
    FindInsuredByCPFRepository,
    CreateInsuredService,
    FindInsuredByCPFService,
    FindInsuredPoliciesRepository,
    FindInsuredPoliciesService,
  ],
  exports: [CreateInsuredService, FindInsuredByCPFService],
})
export class InsuredModule {}
