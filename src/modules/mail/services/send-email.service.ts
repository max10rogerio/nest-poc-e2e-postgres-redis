import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SentMessageInfo } from 'nodemailer';
import { Env } from 'src/config';

@Injectable()
export class SendEmailService {
  constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService<Env>) {}

  public async send(params: ISendMailOptions): Promise<SentMessageInfo> {
    params.to = this.makeTo(params);
    params.from = this.makeFrom();
    params.subject = this.makeSubject(params);
    return await this.mailerService.sendMail(params);
  }

  makeTo(params: ISendMailOptions) {
    const { mailMock } = this.configService.get<Env['mail']>('mail');
    return mailMock || params.to;
  }

  makeFrom() {
    return `"Gazin Bank - Seguros" <${this.configService.get('mail').from}>`;
  }

  makeSubject(params: ISendMailOptions) {
    return params.subject;
  }
}
