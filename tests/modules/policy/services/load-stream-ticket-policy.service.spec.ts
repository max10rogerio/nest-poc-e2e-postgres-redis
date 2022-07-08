import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { DatabaseModule } from 'src/modules/database/database.module';
import { CreateTicketPDFService } from 'src/modules/pdf/services';
import { PolicyModule } from 'src/modules/policy/policy.module';
import {
  FindPolicyByIdService,
  FindPolicyByIdServiceResponse,
  FindTicketReportDataService,
  LoadStreamTicketPolicyService,
  SaveTicketPdfPathPolicyService,
} from 'src/modules/policy/services';
import { Readable, Writable } from 'stream';
import { reportPolicyData } from './__mocks__/find-ticket-report-data.service.mock';

class WriteMemory extends Writable {
  buffer: string;

  constructor() {
    super();
    this.buffer = '';
  }

  _write(chunk, _, next) {
    this.buffer += chunk;
    next();
  }

  reset() {
    this.buffer = '';
  }
}

describe('LoadStreamTicketPolicyService Unit', () => {
  let app: TestingModule;

  let loadStreamTicketPolicyService: LoadStreamTicketPolicyService;
  let createTicketPDFService: CreateTicketPDFService;
  let saveTicketPdfPathPolicyService: SaveTicketPdfPathPolicyService;
  let findPolicyByIdService: FindPolicyByIdService;
  let findTicketReportDataService: FindTicketReportDataService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [PolicyModule, DatabaseModule, ConfigModule],
    }).compile();

    loadStreamTicketPolicyService = app.get<LoadStreamTicketPolicyService>(LoadStreamTicketPolicyService);
    findPolicyByIdService = app.get<FindPolicyByIdService>(FindPolicyByIdService);
    saveTicketPdfPathPolicyService = app.get<SaveTicketPdfPathPolicyService>(SaveTicketPdfPathPolicyService);
    createTicketPDFService = app.get<CreateTicketPDFService>(CreateTicketPDFService);
    findTicketReportDataService = app.get<FindTicketReportDataService>(FindTicketReportDataService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be return a stream of file if exists', async () => {
    const paramsMock = 1;
    const streamMock = Readable.from(Buffer.from('test'));

    jest.spyOn(createTicketPDFService, 'toPDF');
    jest.spyOn(fs, 'createReadStream').mockReturnValue(streamMock as any);
    jest.spyOn(findPolicyByIdService, 'findById').mockResolvedValue({
      id: paramsMock,
      ticketPDF: '/test/test.pdf',
    } as FindPolicyByIdServiceResponse);

    await expect(loadStreamTicketPolicyService.loadStream(paramsMock)).resolves.toBeInstanceOf(Readable);

    expect(fs.createReadStream).toHaveBeenCalled();
    expect(createTicketPDFService.toPDF).not.toHaveBeenCalled();

    return Promise.resolve();
  });

  it('should be create a pdf file, store a link in database and return stream case if not exists', async () => {
    const paramsMock = 1;
    const bufferMock = Buffer.from('test');

    jest.spyOn(fs, 'createWriteStream').mockImplementation(() => new WriteMemory() as any);
    jest.spyOn(fsPromises, 'mkdir').mockImplementation(() => Promise.resolve('created'));
    jest.spyOn(path, 'join').mockReturnValueOnce(path.join(__dirname, 'tickets'));
    jest.spyOn(saveTicketPdfPathPolicyService, 'save').mockImplementation(() => Promise.resolve());
    jest.spyOn(createTicketPDFService, 'toPDF').mockResolvedValue(bufferMock);
    jest.spyOn(findPolicyByIdService, 'findById').mockResolvedValue({
      id: paramsMock,
      ticketPDF: null,
    } as FindPolicyByIdServiceResponse);
    jest.spyOn(findTicketReportDataService, 'findTicketReportData').mockResolvedValue(reportPolicyData);

    await expect(loadStreamTicketPolicyService.loadStream(paramsMock)).resolves.toBeInstanceOf(Readable);

    expect(saveTicketPdfPathPolicyService.save).toHaveBeenCalledWith(
      1,
      path.join(__dirname, 'tickets', `ticket-${paramsMock}.pdf`),
    );

    expect(createTicketPDFService.toPDF).toHaveBeenCalledWith(reportPolicyData);

    expect(fs.createWriteStream).toHaveBeenCalled();
  });
});
