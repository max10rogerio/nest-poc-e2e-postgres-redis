import { Injectable, Scope } from '@nestjs/common';
import { HelperText } from '../utils/helper-text-function';

@Injectable({ scope: Scope.TRANSIENT })
export class CreateTextDIHService extends HelperText {
  public async createTextDIH(params: CreateTextDIHServiceParams): Promise<string> {
    const result = this.setHeader(params).setSales(params.sales).setTrailer(params.trailer).getText();

    return result;
  }

  private setHeader(params: CreateTextDIHServiceParams): this {
    this.setRecordType()
      .setDates(params.shippingDate)
      .setShippingNumber(params.shippingNumber)
      .setInsurerCode(params.insurerCode)
      .setWhiteSpaces(24)
      .setContractNumber(params.contractNumber)
      .setWhiteSpaces(1946)
      .setBreakLine();

    return this;
  }

  private setRecordType(): this {
    this.appendStr('01');

    return this;
  }

  private setRecordTypeSale(): this {
    this.appendStr('23');

    return this;
  }

  private setSubStipulatingNumber(): this {
    this.appendStr('0000');

    return this;
  }

  private setRecordTypeFile(): this {
    this.appendStr('E');

    return this;
  }

  private setSales(sales: Sales[]): this {
    for (const sale of sales) {
      this.setRecordTypeSale()
        .setSubStipulatingNumber()
        .setRecordTypeFile()
        .setRecordSequence(sale.recordSequence)
        .setContractPlan(sale.contractPlan)
        .setMonthsValidity()
        .setWhiteSpaces(10)
        .setTicketNumber(sale.ticketNumber)
        .setCpfCnpj(sale.cpfCnpj)
        .setWhiteSpaces(34)
        .setContractorName(sale.contractorName)
        .setDates(sale.dateBirthFoundation)
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
        .setWhiteSpaces(26)
        .setModuleNumber(sale.moduleNumber)
        .setWhiteSpaces(20)
        .setValueAward(sale.valueAward)
        .setWhiteSpaces(2)
        .setDates(sale.contractDate)
        .setInstallmentValue(sale.installmentValue)
        .setInstallmentAmount(sale.installmentAmount)
        .setZeroSpaces(20)
        .setDates(sale.installmentDueFirst)
        .setWhiteSpaces(29)
        .setOperationType()
        .setAmountCollected(sale.amountCollected)
        .setDates(sale.dueDate)
        .setDates(sale.collectionDate)
        .setDates(sale.operationDate)
        .setWhiteSpaces(15)
        .setZeroSpaces(18)
        .setWhiteSpaces(300)
        .setLotRaffle(sale.lotRaffle)
        .setLuckyNumber(sale.luckyNumber)
        .setZeroSpaces(21)
        .setWhiteSpaces(1081)
        .setBreakLine();
    }
    return this;
  }

  private setRecordSequence(value: number): this {
    const valueSequence = value.toString().padStart(6, '0');
    this.appendStr(valueSequence);

    return this;
  }

  private setContractPlan(value: number): this {
    const valueContract = value.toString().padStart(3, '0');
    this.appendStr(valueContract);

    return this;
  }

  private setMonthsValidity(): this {
    this.appendStr('01');

    return this;
  }

  private setTicketNumber(value: number): this {
    const valueTicket = value.toString().padStart(20, '0');
    this.appendStr(valueTicket);

    return this;
  }

  private setCpfCnpj(value: number): this {
    const valueCpfCnpj = value.toString().padStart(14, '0');
    this.appendStr(valueCpfCnpj);

    return this;
  }

  private setContractorName(value: string): this {
    this.appendStr(value.padEnd(50, ' '));

    return this;
  }

  private setInstallmentValue(value: string): this {
    this.appendStr(value);

    return this;
  }

  private setInstallmentAmount(value: number): this {
    this.appendStr(value.toString());

    return this;
  }

  private setOperationType(): this {
    this.appendStr('A');

    return this;
  }

  private setAmountCollected(value: string): this {
    this.appendStr(value.toString().padStart(15, '0'));

    return this;
  }

  private setLotRaffle(value: string): this {
    this.appendStr(value);

    return this;
  }

  private setLuckyNumber(value: string): this {
    this.appendStr(value);

    return this;
  }

  private setTrailer(trailers: Trailer[]): this {
    for (const trailer of trailers) {
      this.setRecordTypeTrailer().setTotalRecorsSent(trailer.totalRecorsSent).setWhiteSpaces(1989).setBreakLine();
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

export type CreateTextDIHServiceParams = {
  shippingDate: string | Date;
  shippingNumber: string;
  insurerCode: number;
  contractNumber: string;
  sales: Sales[];
  trailer: Trailer[];
};

type Sales = {
  recordSequence: number;
  contractPlan: number;
  ticketNumber: number;
  cpfCnpj: number;
  contractorName: string;
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
  installmentValue: string;
  installmentAmount: number;
  installmentDueFirst: string | Date;
  amountCollected: string;
  dueDate: string | Date;
  collectionDate: string | Date;
  operationDate: string | Date;
  lotRaffle: string;
  luckyNumber: string;
};

type Trailer = {
  totalRecorsSent: string;
};
