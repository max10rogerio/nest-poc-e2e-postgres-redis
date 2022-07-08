import { Injectable, Scope } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { HelperText } from '../utils/helper-text-function';

@Injectable({ scope: Scope.TRANSIENT })
export class CreateTextREService extends HelperText {
  public async createTextRE(params: CreateTextREServiceParams): Promise<string> {
    const result = this.setHeader(params).setSales(params.sales).setTrailer(params.trailer).getText();
    return result;
  }

  private setHeader(params: CreateTextREServiceParams): this {
    this.setRecordType()
      .setDates(params.shippingDate)
      .setShippingNumber(params.shippingNumber)
      .setInsurerCode(params.insurerCode)
      .setWhiteSpaces(24)
      .setContractNumber(params.contractNumber)
      .setWhiteSpaces(747)
      .setBreakLine();

    return this;
  }

  private setRecordType(): this {
    this.appendStr('01');

    return this;
  }

  private setSales(sales: Sales[]): this {
    for (const sale of sales) {
      this.setRecordTypeSale()
        .setSubStipulatingNumber()
        .setRecordSequence(sale.recordSequence)
        .setWhiteSpaces(5)
        .setTicketNumber(sale.ticketNumber)
        .setContractorName(sale.contractorName)
        .setCpfCnpj(sale.cpfCnpj)
        .setDates(sale.dateBirthFoundation)
        .setWhiteSpaces(34)
        .setSex(sale.sex)
        .setMaritalStatus(sale.maritalStatus)
        .setAddress(sale.address)
        .setComplement(sale.complement)
        .setDistrict(sale.district)
        .setCity(sale.city)
        .setCep(sale.cep)
        .setUf(sale.uf)
        .setDdd(sale.ddd)
        .setPhone(sale.phone)
        .setWhiteSpaces(16)
        .setModuleNumber(sale.moduleNumber)
        .setValueAward(sale.valueAward)
        .setDates(sale.contractDate)
        .setDates(sale.contractDate)
        .setEndValidity(sale.contractDate)
        .setAmountInstallment()
        .setWhiteSpaces(16)
        .setContractorName(sale.contractorName)
        .setCpfCnpj(sale.cpfCnpj)
        .setDates(sale.dateBirthFoundation)
        .setWhiteSpaces(34)
        .setSex(sale.sex)
        .setMaritalStatus(sale.maritalStatus)
        .setRiskAddress(sale.riskAddress)
        .setRiskComplement(sale.riskComplement)
        .setRiskDistrict(sale.riskDistrict)
        .setRiskCity(sale.riskCity)
        .setRiskCep(sale.riskCep)
        .setRiskUf(sale.riskUf)
        .setTypeHousing(sale.typeHousing)
        .setTypeConstruction(sale.typeConstruction)
        .setPropertyType(sale.propertyType)
        .setWhiteSpaces(9)
        .setSerialNumber(sale.serialNumber)
        .setLuckyNumber(sale.luckyNumber)
        .setWhiteSpaces(29)
        .setBreakLine();
    }

    return this;
  }

  private setRecordTypeSale(): this {
    this.appendStr('03');

    return this;
  }
  private setSubStipulatingNumber(): this {
    this.appendStr('01');

    return this;
  }

  private setRecordSequence(value: number): this {
    const valueSequence = value.toString().padStart(6, '0');
    this.appendStr(valueSequence);

    return this;
  }

  private setTicketNumber(value: number): this {
    const valueTicket = value.toString().padStart(15, '0');
    this.appendStr(valueTicket);

    return this;
  }

  private setContractorName(value: string): this {
    this.appendStr(value.padEnd(50, ' '));

    return this;
  }

  private setCpfCnpj(value: number): this {
    const valueCpfCnpj = value.toString().padStart(14, '0');
    this.appendStr(valueCpfCnpj);

    return this;
  }

  private setEndValidity(value: string | Date): this {
    const date = dayjs(value).add(30, 'day').format('YYYYMMDD');

    this.appendStr(date);

    return this;
  }

  private setAmountInstallment(): this {
    this.appendStr('01');

    return this;
  }

  private setRiskAddress(value: string): this {
    this.appendStr(value.padEnd(70, ' '));

    return this;
  }

  private setRiskComplement(value: string): this {
    this.appendStr((value || '').padEnd(70, ' '));

    return this;
  }

  private setRiskDistrict(value: string): this {
    this.appendStr(value.padEnd(25, ' '));

    return this;
  }

  private setRiskCity(value: string): this {
    this.appendStr(value.padEnd(35, ' '));

    return this;
  }

  private setRiskCep(value: number): this {
    this.appendStr(value.toString());

    return this;
  }

  private setRiskUf(value: string): this {
    this.appendStr(value);

    return this;
  }

  private setTypeHousing(value: string): this {
    this.appendStr(value);

    return this;
  }

  private setTypeConstruction(value: string): this {
    this.appendStr(value);

    return this;
  }

  private setPropertyType(value: string): this {
    this.appendStr(value);

    return this;
  }

  private setSerialNumber(value: number): this {
    this.appendStr((value ? value.toString() : '').padEnd(4, ' '));

    return this;
  }

  private setLuckyNumber(value: number): this {
    this.appendStr((value ? value.toString() : '').padEnd(6, ' '));

    return this;
  }

  private setTrailer(trailers: Trailer[]): this {
    for (const trailer of trailers) {
      this.setRecordTypeTrailer().setTotalRecorsSent(trailer.totalRecorsSent).setWhiteSpaces(789).setBreakLine();
    }
    return this;
  }

  private setRecordTypeTrailer(): this {
    this.appendStr('16');

    return this;
  }

  private setTotalRecorsSent(value: string): this {
    this.appendStr(value);

    return this;
  }
}

export type CreateTextREServiceParams = {
  shippingDate: string | Date;
  shippingNumber: string;
  insurerCode: number;
  contractNumber: string;
  sales: Sales[];
  trailer: Trailer[];
};

type Sales = {
  recordSequence: number;
  ticketNumber: number;
  contractorName: string;
  cpfCnpj: number;
  dateBirthFoundation: string | Date;
  sex: string;
  maritalStatus: string;
  address: string;
  complement: string;
  district: string;
  city: string;
  cep: number;
  uf: string;
  ddd: string;
  phone: number;
  moduleNumber: string;
  valueAward: string;
  contractDate: string | Date;
  riskAddress: string;
  riskComplement: string;
  riskDistrict: string;
  riskCity: string;
  riskCep: number;
  riskUf: string;
  typeHousing: string;
  typeConstruction: string;
  propertyType: string;
  serialNumber: number;
  luckyNumber: number;
};

type Trailer = {
  totalRecorsSent: string;
};
