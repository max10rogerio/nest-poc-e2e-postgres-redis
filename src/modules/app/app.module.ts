import { Module } from '@nestjs/common';
import { AddressModule } from '../address/address.module';
import { AdminModule } from '../admin/admin.module';
import { ApoloModule } from '../apolo/apolo.module';
import { CepModule } from '../cep/cep.module';
import { CommonModule } from '../common/common.module';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { ExportModule } from '../export/export.module';
import { FileModule } from '../file/file.module';
import { GatewayLydiansModule } from '../gateway-lydians/gateway-lydians.module';
import { HabitationModule } from '../habitation/habitation.module';
import { I4proModule } from '../i4pro/i4pro.module';
import { InsuredModule } from '../insured/insured.module';
import { LotteryModule } from '../lottery/loterry.module';
import { MailModule } from '../mail/mail.module';
import { PDFModule } from '../pdf/pdf.module';
import { PersonModule } from '../person/person.module';
import { PlansModule } from '../plans/plans.module';
import { PolicyModule } from '../policy/policy.module';
import { ProductsModule } from '../products/products.module';
import { QueueModule } from '../queue/queue.module';
import { SentryModule } from '../sentry/sentry.module';
import { SmsModule } from '../sms/sms.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    SentryModule,
    DatabaseModule,
    AdminModule,
    ProductsModule,
    PlansModule,
    CommonModule,
    LotteryModule,
    PolicyModule,
    InsuredModule,
    ExportModule,
    PersonModule,
    ApoloModule,
    LotteryModule,
    PolicyModule,
    InsuredModule,
    CepModule,
    HabitationModule,
    FileModule,
    CepModule,
    GatewayLydiansModule,
    AddressModule,
    I4proModule,
    PDFModule,
    SmsModule,
    MailModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
