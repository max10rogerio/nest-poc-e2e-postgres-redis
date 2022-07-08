import * as dayjs from 'dayjs';

export abstract class HelperText {
  protected text = '';

  public appendStr(value: string): void {
    this.text = this.text.concat(value);
  }

  public getText(): string {
    return this.text;
  }

  public setBreakLine(): this {
    this.appendStr('\n');

    return this;
  }

  public setWhiteSpaces(value: number): this {
    const WHITE_SPACE = ' ';
    this.appendStr(WHITE_SPACE.repeat(value));

    return this;
  }

  public setZeroSpaces(value: number): this {
    const countZero = '0';
    this.appendStr(countZero.repeat(value));

    return this;
  }

  public setDates(value: string | Date): this {
    const date = dayjs(value).format('YYYYMMDD');

    this.appendStr(date);

    return this;
  }

  public setShippingNumber(value: string): this {
    const valueShipping = value.toString().padStart(6, '0');
    this.appendStr(valueShipping);

    return this;
  }

  public setInsurerCode(value: number): this {
    this.appendStr(value.toString());

    return this;
  }

  public setContractNumber(value: string): this {
    this.appendStr(value.toString());

    return this;
  }

  public setSex(value: string): this {
    this.appendStr(value);

    return this;
  }

  public setMaritalStatus(value: string): this {
    this.appendStr(value);

    return this;
  }

  public setAddress(value: string): this {
    this.appendStr(value.padEnd(70, ' '));

    return this;
  }

  public setComplement(value: string): this {
    this.appendStr((value || '').padEnd(70, ' '));

    return this;
  }

  public setDistrict(value: string): this {
    this.appendStr(value.padEnd(25, ' '));

    return this;
  }

  public setCity(value: string): this {
    this.appendStr(value.padEnd(35, ' '));

    return this;
  }

  public setCep(value: number): this {
    this.appendStr(value.toString());

    return this;
  }

  public setUf(value: string): this {
    this.appendStr(value);

    return this;
  }

  public setDdd(value: string): this {
    this.appendStr(value);

    return this;
  }

  public setPhone(value: number): this {
    this.appendStr(value.toString());

    return this;
  }

  public setModuleNumber(value: string): this {
    this.appendStr(value);

    return this;
  }

  public setValueAward(value: string): this {
    this.appendStr(value);

    return this;
  }
}
