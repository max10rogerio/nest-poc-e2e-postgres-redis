import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { UPLOADS_PATH } from 'src/config';
import { CreateTicketPDFService } from 'src/modules/pdf/services';
import { Readable } from 'stream';
import { FindPolicyByIdService } from './find-policy-by-id.service';
import { FindTicketReportDataService } from './find-ticket-report-data.service';
import { SaveTicketPdfPathPolicyService } from './save-ticket-pdf-path-policy.service';

@Injectable()
export class LoadStreamTicketPolicyService {
  constructor(
    private readonly findPolicyByIdService: FindPolicyByIdService,
    private readonly createTicketPDFService: CreateTicketPDFService,
    private readonly saveTicketPdfPathPolicyService: SaveTicketPdfPathPolicyService,
    private readonly findTicketReportDataService: FindTicketReportDataService,
  ) {}

  async loadStream(policyId: number): Promise<Readable> {
    const policy = await this.findPolicyByIdService.findById(policyId);

    let stream: Readable;

    if (policy.ticketPDF) {
      stream = createReadStream(policy.ticketPDF);
    } else {
      const data = await this.findTicketReportDataService.findTicketReportData(policyId);

      const pdfBuffer = await this.createTicketPDFService.toPDF(data);

      stream = Readable.from(pdfBuffer);

      const ticketFolderPath = join(UPLOADS_PATH, 'tickets');

      await mkdir(ticketFolderPath, { recursive: true });

      const ticketFilePath = join(ticketFolderPath, `ticket-${policyId}.pdf`);

      await this.saveTicketPdfPathPolicyService.save(policy.id, ticketFilePath);

      const writePdfFileStream = createWriteStream(ticketFilePath);

      stream.pipe(writePdfFileStream);
    }

    return stream;
  }
}
