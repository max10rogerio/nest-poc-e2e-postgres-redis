import { Injectable } from '@nestjs/common';
import { TicketContext } from 'src/modules/pdf/contexts';
import { FindTicketReportDataRepository } from '../repositories';

@Injectable()
export class FindTicketReportDataService {
  constructor(private readonly findTicketReportDataRepository: FindTicketReportDataRepository) {}

  public async findTicketReportData(policyId: number): Promise<TicketContext> {
    return await this.findTicketReportDataRepository.findPolicyReportData(policyId);
  }
}
