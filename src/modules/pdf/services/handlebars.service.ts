import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as fs from 'fs/promises';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { PDFTemplates } from '../constants';

@Injectable()
export class HandlebarsService {
  async compile<T = any>(template: PDFTemplates, context: T): Promise<string> {
    const view = await this.readTemplateFile(template);

    this.registerHelpers();

    const renderHtml = Handlebars.compile(view);

    const html = renderHtml(context);

    return html;
  }

  private async readTemplateFile(template): Promise<string> {
    return fs.readFile(this.makePathToTemplate(template), { encoding: 'utf-8' });
  }

  private makeTemplateFileName(template: PDFTemplates): string {
    return `${template}.hbs`;
  }

  private makePathToTemplate(template: PDFTemplates): string {
    return path.join(__dirname, '..', 'views', this.makeTemplateFileName(template));
  }

  private registerHelpers() {
    const helpers = this.createHelperObject();

    for (const [key, fn] of Object.entries(helpers)) {
      Handlebars.registerHelper(key, fn);
    }
  }

  private createHelperObject() {
    return {
      toCEP: function (cep: string): string {
        return cep.toString().replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
      },
      toCPF: function (cpf: string): string {
        return cpf.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      },
      toCNPJ: function (cnpj: string): string {
        return cnpj.toString().replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      },
      toDate: function (date: Date): string {
        return dayjs(date).format('DD/MM/YYYY');
      },
      toTime: function (date: Date): string {
        return dayjs(date).format('HH:mm');
      },
      toMoneyBRL: function (value: number) {
        return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value);
      },
    };
  }
}
