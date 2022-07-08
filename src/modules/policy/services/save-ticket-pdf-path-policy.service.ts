import { Injectable } from '@nestjs/common';
import { SaveTicketPdfPathPolicyRepository } from '../repositories';

@Injectable()
export class SaveTicketPdfPathPolicyService {
  constructor(private readonly saveTicketPdfPathPolicyRepository: SaveTicketPdfPathPolicyRepository) {}

  async save(policyId: number, ticketPdfPath: string): Promise<void> {
    return this.saveTicketPdfPathPolicyRepository.save(policyId, ticketPdfPath);
  }
}
