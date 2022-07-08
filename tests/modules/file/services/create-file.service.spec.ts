import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import {
  CreateFileService,
  CreateFileServiceParams,
  CreateFileServiceResponse,
} from 'src/modules/file/services/create-file.service';

describe('CreateFileService Unit', () => {
  let createFileService: CreateFileService;
  const folder = 'uploads_test';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CreateFileService],
    }).compile();

    createFileService = app.get<CreateFileService>(CreateFileService);
  });

  afterEach(async () => {
    await fs.promises.rm(folder, { recursive: true, force: true });
  });

  it('should create file', async () => {
    const params: CreateFileServiceParams = {
      folder: folder,
      file: 'dih-0000000001.txt',
      text: 'HEADER\nSALE1\nSALE2\nTRAILER\n',
    };
    const result = await createFileService.createFile(params);

    const expected: CreateFileServiceResponse = {
      path: decodeURIComponent(`${params.folder}/${params.file}`),
    };

    expect(result).toEqual(expected);
  });
});
