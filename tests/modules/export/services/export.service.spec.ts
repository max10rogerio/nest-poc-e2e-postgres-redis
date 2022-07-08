import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import { ExportTypeEnum } from 'src/modules/export/constants';
import {
  CreateExportService,
  FindPoliciesNotExportedService,
  UpdatePolicyExportedService,
} from 'src/modules/export/services/';
import { ExportService, ExportServiceParams } from 'src/modules/export/services/export.service';
import { CopyFileService, CreateFileService } from 'src/modules/file/services';
import { CreateTextDIHService, CreateTextREService } from 'src/modules/i4pro/services';
import {
  errorExport,
  exportDih,
  exportError,
  exportRe,
  policiesDih,
  policiesRe,
} from './__mocks__/export.service.mock';

describe('ExportService Unit', () => {
  let app: TestingModule;
  let exportService: ExportService;
  let findPoliciesNotExportedService: FindPoliciesNotExportedService;
  let createTextDIHService: CreateTextDIHService;
  let createTextREService: CreateTextREService;
  let createFileService: CreateFileService;
  let copyFileService: CopyFileService;
  let createExportService: CreateExportService;
  let updatePolicyExportedService: UpdatePolicyExportedService;
  let configService: ConfigService;

  beforeEach(async () => {
    process.env.FTP_PATH_DIH = 'https://test/api';
    process.env.FTP_PATH_RE = 'eyJ0eXA';
    app = await Test.createTestingModule({
      providers: [
        ExportService,
        ConfigService,
        {
          provide: FindPoliciesNotExportedService,
          useFactory: () => ({
            findPoliciesNotExportedResidential: jest.fn(),
            findPoliciesNotExportedDIH: jest.fn(),
          }),
        },
        {
          provide: CreateTextDIHService,
          useFactory: () => ({
            createTextDIH: jest.fn(),
          }),
        },
        {
          provide: CreateTextREService,
          useFactory: () => ({
            createTextRE: jest.fn(),
          }),
        },
        {
          provide: CreateFileService,
          useFactory: () => ({
            createFile: jest.fn(),
          }),
        },
        {
          provide: CopyFileService,
          useFactory: () => ({
            copyFile: jest.fn(),
          }),
        },
        {
          provide: CreateExportService,
          useFactory: () => ({
            createExport: jest.fn(),
          }),
        },
        {
          provide: UpdatePolicyExportedService,
          useFactory: () => ({
            updatePolicyExported: jest.fn(),
          }),
        },
      ],
    }).compile();

    configService = app.get<ConfigService>(ConfigService);
    updatePolicyExportedService = app.get<UpdatePolicyExportedService>(UpdatePolicyExportedService);
    createExportService = app.get<CreateExportService>(CreateExportService);
    copyFileService = app.get<CopyFileService>(CopyFileService);
    createFileService = app.get<CreateFileService>(CreateFileService);
    createTextREService = app.get<CreateTextREService>(CreateTextREService);
    createTextDIHService = app.get<CreateTextDIHService>(CreateTextDIHService);
    findPoliciesNotExportedService = app.get<FindPoliciesNotExportedService>(FindPoliciesNotExportedService);
    exportService = app.get<ExportService>(ExportService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should export dih policies', async () => {
    jest.spyOn(findPoliciesNotExportedService, 'findPoliciesNotExportedDIH').mockResolvedValue(policiesDih);
    jest.spyOn(createTextDIHService, 'createTextDIH').mockResolvedValue('');
    jest.spyOn(createFileService, 'createFile').mockResolvedValue(undefined);
    jest.spyOn(copyFileService, 'copyFile').mockResolvedValue(undefined);
    jest.spyOn(createExportService, 'createExport').mockResolvedValue(exportDih);
    jest.spyOn(updatePolicyExportedService, 'updatePolicyExported').mockResolvedValue(true);
    jest.spyOn(exportService, 'policesDihToTextParams');
    jest.spyOn(configService, 'get').mockResolvedValue('' as never);

    const currentDate = dayjs();

    const params: ExportServiceParams = {
      type: ExportTypeEnum.DIH,
    };

    await exportService.export(params);

    expect(exportService.policesDihToTextParams).toHaveBeenCalled();
    expect(exportService.policesDihToTextParams).toHaveBeenCalledWith(policiesDih, currentDate.format('YYYY-MM-DD'));
  });

  it('should export re policies', async () => {
    jest.spyOn(findPoliciesNotExportedService, 'findPoliciesNotExportedResidential').mockResolvedValue(policiesRe);
    jest.spyOn(createTextREService, 'createTextRE').mockResolvedValue('');
    jest.spyOn(createFileService, 'createFile').mockResolvedValue(undefined);
    jest.spyOn(copyFileService, 'copyFile').mockResolvedValue(undefined);
    jest.spyOn(createExportService, 'createExport').mockResolvedValue(exportRe);
    jest.spyOn(updatePolicyExportedService, 'updatePolicyExported').mockResolvedValue(true);
    jest.spyOn(exportService, 'policesReToTextParams');
    jest.spyOn(configService, 'get').mockResolvedValue('' as never);

    const currentDate = new Date();
    const year = String(currentDate.getFullYear());
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = String(currentDate.getDate()).padStart(2, '0');

    const params: ExportServiceParams = {
      type: ExportTypeEnum.RE,
    };

    await exportService.export(params);

    expect(exportService.policesReToTextParams).toHaveBeenCalled();
    expect(exportService.policesReToTextParams).toHaveBeenCalledWith(policiesRe, `${year}-${month}-${date}`);
  });

  it('Error - should export error', async () => {
    jest.spyOn(findPoliciesNotExportedService, 'findPoliciesNotExportedDIH').mockResolvedValue(policiesDih);
    jest.spyOn(createTextDIHService, 'createTextDIH').mockResolvedValue('');
    jest.spyOn(createFileService, 'createFile').mockRejectedValue(errorExport);
    jest.spyOn(copyFileService, 'copyFile').mockResolvedValue(undefined);
    jest.spyOn(createExportService, 'createExport').mockResolvedValue(exportError);
    jest.spyOn(updatePolicyExportedService, 'updatePolicyExported').mockResolvedValue(true);
    jest.spyOn(exportService, 'policesDihToTextParams');
    jest.spyOn(configService, 'get').mockResolvedValue('' as never);

    const params: ExportServiceParams = {
      type: ExportTypeEnum.DIH,
    };

    await exportService.export(params);

    await expect(copyFileService.copyFile).not.toHaveBeenCalled();
  });
});
