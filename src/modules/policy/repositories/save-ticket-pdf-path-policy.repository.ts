import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicyEntity } from 'src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class SaveTicketPdfPathPolicyRepository {
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly policyRepository: Repository<PolicyEntity>,
  ) {}

  async save(policyId: number, ticketPdfPath: string): Promise<void> {
    await this.policyRepository.update(policyId, { ticketPDF: ticketPdfPath });
  }
}
