import { AdminModule as AdminJSModule, AdminModuleOptions } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AdminJS from 'adminjs';
import { isDevOrTest } from 'src/config';
import { DatabaseModule } from '../database/database.module';
import { resources } from './admin.resources';
import { AdminAuthService } from './services/auth.service';
import { bulkSoftDelete, softDelete } from './utils';

AdminJS.ACTIONS.delete.handler = softDelete;
AdminJS.ACTIONS.bulkDelete.handler = bulkSoftDelete;

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminJSModule.createAdminAsync({
      imports: [ConfigModule, DatabaseModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config: AdminModuleOptions = {
          auth: {
            cookieName: 'admin',
            cookiePassword: 'admin-password',
            authenticate: async (email, password) => {
              const result = await new AdminAuthService(configService).authenticate(email, password);

              return result;
            },
          },
          adminJsOptions: {
            rootPath: '/admin',
            resources: resources,
            locale: {
              language: 'pt-BR',
              translations: {
                labels: {
                  ProductEntity: 'Produtos',
                  PlanEntity: 'Planos',
                  CoverageEntity: 'Coberturas',
                  PlanCoverageEntity: 'Plano Cobertura',
                  InsuredEntity: 'Segurados',
                  AddressEntity: 'Endereços',
                  PolicyEntity: 'Apólices',
                  InstallmentEntity: 'Parcelas',
                  PropertyEntity: 'Imóveis',
                  PolicyResidentialEntity: 'Seguro Residencial',
                  AgentEntity: 'Representantes',
                  LotteryConfigEntity: 'Configurações Número da Sorte',
                  HousingTypeEntity: 'Tipos de Moradia',
                  CoverageTypeEntity: 'Tipos de Coberturas',
                  AgentTypeEntity: 'Tipos de Representantes',
                  HabitationTypeEntity: 'Tipo Habitação',
                  HabitationEntity: 'Habitação',
                  LogPaymentsEntity: 'Log de Pagamentos',
                  PaymentsEntity: 'Pagamentos',
                  ProductAgentEntity: 'Produto-Representante',
                },
              },
            },
          },
        };

        if (isDevOrTest) delete config.auth;

        return config;
      },
    }),
  ],
})
export class AdminModule {}
