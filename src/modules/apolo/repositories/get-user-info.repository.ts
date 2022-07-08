import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Env } from 'src/config';

@Injectable()
export class GetUserInfoRepository {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService<Env>) {}

  public async getUserInfo(cpf: string): Promise<GetUserInfoRepositoryResponse | null> {
    const { token } = this.getApoloConfig();
    const url = this.makeUrl();
    const observable = this.httpService.get<ApoloRequestResponse>(url, {
      params: {
        document: cpf,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const { data } = await firstValueFrom(observable);
    const hasUser = !!data;

    if (!hasUser) return null;

    return data;
  }

  private makeUrl(): string {
    const { url: apoloUrl } = this.getApoloConfig();
    const url = new URL('person', apoloUrl).toString();

    return url;
  }

  private getApoloConfig() {
    return this.configService.get<Env['apolo_api']>('apolo_api');
  }
}

export type GetUserInfoRepositoryResponse = ApoloRequestResponse;

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NEUTRAL = 'NEUTRAL',
}

export enum MaritalStatus {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  STABLE_RELATION = 'STABLE_RELATION',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

export type ApoloRequestResponse = {
  person_id: string;
  cpf: string;
  name: string;
  mother_name: string;
  father_name: any;
  sex: Sex;
  marital_status: MaritalStatus;
  educational_level: string;
  risk_rating: string;
  fit_account: boolean;
  birth: Birth;
  identity_cards: IdentityCard[];
  residencial_address: Address;
  contacts: Contact[];
  personal_contact: PersonalContact;
};

export type Birth = {
  birthdate: string;
  nationality: string;
  city: string;
  federative_unity: string;
};

export type PersonalContact = {
  phone_number: string;
  alternative_phone_number: string;
  email: string;
};

export type IdentityCard = {
  register_field: string;
  federative_unity: string;
  dispatching_agency: string;
  dispatch_date: string;
  type: string;
};

export type Address = {
  cep: string;
  street: string;
  house_number: string;
  neighborhood: string;
  complement: string;
  city: City;
};

export type City = {
  name: string;
  state: State;
};

export type State = {
  initials: string;
  name: string;
};

export type Contact = {
  phone_number: string;
  alternative_phone_number: string;
  email: string;
  description: string;
  name: string;
  type: string;
};
