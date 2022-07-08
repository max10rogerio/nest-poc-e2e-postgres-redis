import { Test, TestingModule } from '@nestjs/testing';
import { CreateExportRepository } from 'src/modules/export/repositories';
import { CreateExportService } from 'src/modules/export/services/';
import { params, response } from './__mocks__/create-export.service.mock';

describe('CreateExportService Unit', () => {
  let createExportService: CreateExportService;
  let createExportRepository: CreateExportRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateExportService,
        {
          provide: CreateExportRepository,
          useFactory: () => ({
            createExport: jest.fn(),
          }),
        },
      ],
    }).compile();

    createExportRepository = app.get<CreateExportRepository>(CreateExportRepository);
    createExportService = app.get<CreateExportService>(CreateExportService);
  });

  it('should create export register', async () => {
    jest.spyOn(createExportRepository, 'createExport').mockResolvedValue(response);

    const result = await createExportService.createExport(params);

    expect(result).toEqual(response);
  });
});
