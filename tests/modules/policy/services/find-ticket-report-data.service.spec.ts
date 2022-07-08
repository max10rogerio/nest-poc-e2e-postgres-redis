import { Test, TestingModule } from '@nestjs/testing';
import { FindTicketReportDataRepository } from 'src/modules/policy/repositories';
import { FindTicketReportDataService } from 'src/modules/policy/services';
import { reportPolicyData } from './__mocks__/find-ticket-report-data.service.mock';

describe('FindTicketReportDataService - Unit', () => {
  let findTicketReportDataService: FindTicketReportDataService;
  let findTicketReportDataRepository: FindTicketReportDataRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindTicketReportDataService,
        {
          provide: FindTicketReportDataRepository,
          useFactory: () => ({
            findPolicyReportData: jest.fn(),
          }),
        },
      ],
    }).compile();

    findTicketReportDataService = app.get<FindTicketReportDataService>(FindTicketReportDataService);
    findTicketReportDataRepository = app.get<FindTicketReportDataRepository>(FindTicketReportDataRepository);
  });

  it('should be return a report policy data', () => {
    jest.spyOn(findTicketReportDataRepository, 'findPolicyReportData').mockResolvedValue(reportPolicyData);

    expect(findTicketReportDataService.findTicketReportData(1)).resolves.toEqual(reportPolicyData);
  });
});
