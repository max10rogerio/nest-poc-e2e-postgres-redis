import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import * as path from 'path';
import { Env, UPLOADS_FOLDER_NAME } from 'src/config';
import { StatusEnum } from 'src/modules/common/constants';
import {
  CopyFileService,
  CopyFileServiceParams,
  CreateFileService,
  CreateFileServiceParams,
} from 'src/modules/file/services';
import {
  CreateTextDIHService,
  CreateTextDIHServiceParams,
  CreateTextREService,
  CreateTextREServiceParams,
} from 'src/modules/i4pro/services';
import { onlyNumbers } from 'src/utils';
import { ExportTypeEnum, MaritalStatusExportEnum } from '../constants';
import { FindPoliciesNotExportedRepositoryResponse } from '../repositories';
import { CreateExportService, CreateExportServiceParams, CreateExportServiceResponse } from './create-export.service';
import { FindPoliciesNotExportedService } from './find-policies-not-exported.service';
import { UpdatePolicyExportedService } from './update-policy-exported.service';

@Injectable()
export class ExportService {
  constructor(
    private readonly findPoliciesNotExportedService: FindPoliciesNotExportedService,
    private readonly createTextDIHService: CreateTextDIHService,
    private readonly createTextREService: CreateTextREService,
    private readonly createExportService: CreateExportService,
    private readonly updatePolicyExportedService: UpdatePolicyExportedService,
    private readonly createFileService: CreateFileService,
    private readonly copyFileService: CopyFileService,
    private readonly configService: ConfigService<Env>,
  ) {}

  public async export(params: ExportServiceParams): Promise<ExportServiceResponse> {
    if (params.type === ExportTypeEnum.DIH || params.type === ExportTypeEnum.RE) {
      let policies: FindPoliciesNotExportedRepositoryResponse;
      if (params.type === ExportTypeEnum.DIH) {
        policies = await this.findPoliciesNotExportedService.findPoliciesNotExportedDIH();
      } else {
        policies = await this.findPoliciesNotExportedService.findPoliciesNotExportedResidential();
      }

      if (policies.length) {
        const currentDate = dayjs();
        const file = `${params.type.toLowerCase()}-${currentDate.format('YYYY-MM-DD-HH:mm:ss')}.txt`;

        const exportFileParams: CreateExportServiceParams = {
          type: params.type,
          log: '',
          file,
          status: StatusEnum.SUCCESS,
        };

        try {
          let text = '';
          if (params.type === ExportTypeEnum.DIH) {
            const textParams: CreateTextDIHServiceParams = this.policesDihToTextParams(
              policies,
              currentDate.format('YYYY-MM-DD'),
            );

            text = await this.createTextDIHService.createTextDIH(textParams);
          } else {
            const textParams: CreateTextREServiceParams = this.policesReToTextParams(
              policies,
              currentDate.format('YYYY-MM-DD'),
            );

            text = await this.createTextREService.createTextRE(textParams);
          }

          const folder = path.join(UPLOADS_FOLDER_NAME, 'export', params.type.toLowerCase());

          const paramsCreateFile: CreateFileServiceParams = {
            folder,
            file,
            text,
          };

          await this.createFileService.createFile(paramsCreateFile);

          const paramsCopyFile: CopyFileServiceParams = {
            folder: folder,
            file: file,
            destination: this.configService.get<Env['ftp_path']>('ftp_path')[params.type.toLocaleLowerCase()],
          };

          await this.copyFileService.copyFile(paramsCopyFile);
        } catch (e) {
          console.log(e);
          exportFileParams.log = e.message;
          exportFileParams.status = StatusEnum.ERROR;
        }

        const exportFile = await this.createExportService.createExport(exportFileParams);

        const policiesId = policies.map((policy) => policy.id);

        await this.updatePolicyExportedService.updatePolicyExported(policiesId, exportFile.id);

        return exportFile;
      }
    }
  }

  public policesDihToTextParams(
    policies: FindPoliciesNotExportedRepositoryResponse,
    shippingDate: string,
  ): CreateTextDIHServiceParams {
    const textParams: CreateTextDIHServiceParams = {
      shippingDate: shippingDate,
      shippingNumber: '',
      insurerCode: 0,
      contractNumber: '',
      sales: policies.map((policy, index) => {
        return {
          recordSequence: index + 1,
          contractPlan: 0,
          ticketNumber: Number(policy.ticket),
          cpfCnpj: Number(onlyNumbers(policy.insured.cpf)),
          contractorName: policy.insured.name,
          dateBirthFoundation: policy.insured.birthDate,
          sex: policy.insured.gender,
          maritalStatus: MaritalStatusExportEnum[policy.insured.maritalStatus],
          address: policy.address.street,
          complement: policy.address.complement,
          district: policy.address.neighborhood,
          city: policy.address.city,
          cep: Number(onlyNumbers(policy.address.cep)),
          uf: policy.address.uf,
          ddd: this.getDDDfromPhoneNumber(policy.insured.telephone),
          phone: Number(this.getPhoneWithoutDDD(policy.insured.telephone)),
          moduleNumber: '',
          valueAward: String(policy.totalValue),
          contractDate: policy.contractDate,
          installmentValue: String(policy.plan.prizeValue),
          installmentAmount: policy.plan.numberInstallments,
          installmentDueFirst: policy.contractDate,
          amountCollected: '',
          dueDate: policy.contractDate,
          collectionDate: shippingDate,
          operationDate: shippingDate,
          lotRaffle: '',
          luckyNumber: String(policy.luckNumber),
        };
      }),
      trailer: [
        {
          totalRecorsSent: String(policies.length),
        },
      ],
    };

    return textParams;
  }

  public policesReToTextParams(
    policies: FindPoliciesNotExportedRepositoryResponse,
    shippingDate: string,
  ): CreateTextREServiceParams {
    const textParams: CreateTextREServiceParams = {
      shippingDate: shippingDate,
      shippingNumber: '',
      insurerCode: 0,
      contractNumber: '',
      sales: policies.map((policy, index) => {
        return {
          recordSequence: index + 1,
          ticketNumber: Number(policy.ticket),
          cpfCnpj: Number(onlyNumbers(policy.insured.cpf)),
          contractorName: policy.insured.name,
          dateBirthFoundation: policy.insured.birthDate,
          sex: policy.insured.gender,
          maritalStatus: MaritalStatusExportEnum[policy.insured.maritalStatus],
          address: policy.address.street,
          complement: policy.address.complement,
          district: policy.address.neighborhood,
          city: policy.address.city,
          cep: Number(onlyNumbers(policy.address.cep)),
          uf: policy.address.uf,
          ddd: this.getDDDfromPhoneNumber(policy.insured.telephone),
          phone: Number(this.getPhoneWithoutDDD(policy.insured.telephone)),
          moduleNumber: '',
          valueAward: String(policy.totalValue),
          contractDate: policy.contractDate,
          riskAddress: policy.policiesResidential[0].address.street,
          riskComplement: policy.policiesResidential[0].address.complement,
          riskDistrict: policy.policiesResidential[0].address.neighborhood,
          riskCity: policy.policiesResidential[0].address.city,
          riskCep: Number(onlyNumbers(policy.policiesResidential[0].address.cep)),
          riskUf: policy.policiesResidential[0].address.uf,
          typeHousing: '',
          typeConstruction: '',
          propertyType: '',
          serialNumber: 0,
          luckyNumber: policy.luckNumber,
        };
      }),
      trailer: [
        {
          totalRecorsSent: String(policies.length),
        },
      ],
    };

    return textParams;
  }

  private getDDDfromPhoneNumber(phone: string) {
    return onlyNumbers(phone).substring(0, 2);
  }

  private getPhoneWithoutDDD(phone: string) {
    return onlyNumbers(phone).substring(2);
  }
}

type ExportQueueType = {
  type: ExportTypeEnum;
};

export type ExportServiceParams = ExportQueueType;
export type ExportServiceResponse = CreateExportServiceResponse;
