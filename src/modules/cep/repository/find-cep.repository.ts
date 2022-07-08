import { Injectable } from '@nestjs/common';
import * as CepPromise from 'cep-promise';

@Injectable()
export class FindCepRepository {
  public async find(cep: string): Promise<FindCepRepositoryResponse> {
    /**
     * (CepPromise as any) is beacause export types in lib cep-promise is wrong
     */
    const result = await (CepPromise as any)(cep, undefined);

    return result;
  }
}

export type FindCepRepositoryResponse = {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  service: string;
};
