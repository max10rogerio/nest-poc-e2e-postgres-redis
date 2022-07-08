import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Env } from 'src/config';
import { ConfigModule } from '../config/config.module';
import { SendEmailService } from './services';
import { makeHelpers } from './utils/handlebars.helper';

@Module({
  providers: [SendEmailService],
  exports: [SendEmailService],
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => {
        const mail = configService.get<Env['mail']>('mail');
        return {
          transport: {
            host: mail.host,
            port: mail.port,
            secure: false,
            auth: {
              pass: mail.password,
              user: mail.user,
            },
          },
          defaults: {
            from: `"Gazin Bank Seguros" <${mail.from}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(makeHelpers(configService.get('domain'))),
            options: {
              strict: true,
            },
          },
          options: {
            partials: {
              dir: join(__dirname, 'templates', 'partials'),
              options: {
                strict: true,
              },
            },
          },
        };
      },
    }),
    ConfigModule,
  ],
})
export class MailModule {}
