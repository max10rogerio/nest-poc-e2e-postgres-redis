import { Test, TestingModule } from '@nestjs/testing';
import { FtpService } from 'nestjs-ftp';
import * as path from 'path';
import { CopyFileService, CopyFileServiceParams, CopyFileServiceResponse } from 'src/modules/file/services';

describe('CopyFileService Unit', () => {
  let copyFileService: CopyFileService;
  let ftpService: FtpService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CopyFileService,
        {
          provide: FtpService,
          useFactory: () => ({
            upload: jest.fn(),
          }),
        },
      ],
    }).compile();

    copyFileService = app.get<CopyFileService>(CopyFileService);
    ftpService = app.get<FtpService>(FtpService);
  });

  it('should copy file', async () => {
    const ftpResponse = {
      code: 226,
      message: '226 Transfer complete.',
    };

    jest.spyOn(ftpService, 'upload').mockResolvedValue(ftpResponse);

    const params: CopyFileServiceParams = {
      folder: '.',
      file: 'README.md',
      destination: '/Hml_Processamento/Fechamento Diario/Movimentos/DIH e Micro. DIH',
    };
    const result = await copyFileService.copyFile(params);

    const expected: CopyFileServiceResponse = {
      path: decodeURIComponent(path.join(params.destination, params.file)),
    };

    expect(result).toEqual(expected);
  });
});
