import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddressEntity,
  ExportEntity,
  InsuredEntity,
  PlanEntity,
  PolicyEntity,
  PolicyResidentialEntity,
  ProductEntity,
} from '../database/models';
import { FileModule } from '../file/file.module';
import { I4proModule } from '../i4pro/i4pro.module';
import {
  CreateExportRepository,
  FindPoliciesNotExportedRepository,
  UpdatePolicyExportedRepository,
} from './repositories/';
import { CreateExportService, FindPoliciesNotExportedService, UpdatePolicyExportedService } from './services/';
import { ExportService } from './services/export.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PolicyEntity,
      InsuredEntity,
      PlanEntity,
      ProductEntity,
      AddressEntity,
      PolicyResidentialEntity,
      ExportEntity,
    ]),
    I4proModule,
    FileModule,
  ],
  providers: [
    FindPoliciesNotExportedRepository,
    CreateExportRepository,
    UpdatePolicyExportedRepository,
    FindPoliciesNotExportedService,
    CreateExportService,
    UpdatePolicyExportedService,
    ExportService,
  ],
  exports: [ExportService],
})
export class ExportModule {}
