import { CronExpression } from '@nestjs/schedule';

export const loadEnv = (): Env => {
  const env: Env = {
    env: process.env.NODE_ENV || 'development',
    domain: process.env.DOMAIN || 'http://localhost:9999',
    port: Number(process.env.PORT || '9999'),
    sentry_dsn: process.env.SENTRY_DSN || 'https://4e2104755eed46999f007a7dc439fdff@sentry.gazin.com.br//108',
    database: loadDatabaseEnvs(),
    api_bank: loadApiBankEnvs(),
    admin: loadAdminEvs(),
    apolo_api: loadApoloEnvs(),
    gateway_payment: loadGatewayPaymentEnvs(),
    sms: loadSmsEnvs(),
    mail: loadEmailEnvs(),
    redis: loadRedisEnvs(),
    ftp: loadFtpEnvs(),
    ftp_path: loadFtpPathEnvs(),
    cron: loadCronEnvs(),
  };

  return env;
};

export const loadDatabaseEnvs = (): Env['database'] => ({
  database: process.env.POSTGRES_DATABASE || 'gazin_seguros_bank',
  port: Number(process.env.POSTGRES_PORT || '5432'),
  host: process.env.POSTGRES_HOST || 'localhost',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
});

export const loadApiBankEnvs = (): Env['api_bank'] => ({
  base_url: process.env.API_BANK_BASE_URL || 'https://api-bank.azurewebsites.net',
  token_url: process.env.API_BANK_TOKEN_URL || '/usuarios/logado',
  identification: process.env.API_BANK_IDENTIFICATION || 'c81e728d9d4c2f636f067f89cc14862c',
});

export const loadAdminEvs = (): Env['admin'] => ({
  username: process.env.ADMIN_USER || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin',
});

export const loadApoloEnvs = () => ({
  url: process.env.APOLO_URL || 'https://hml-apolo.gazin.com.br/api/v1/',
  token:
    process.env.APOLO_TOKEN ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZWE1ZjJjNy1mZjg2LTRiMmMtYjZmZS1iMjdiMTY0ODQxMDIiLCJhcHBsaWNhdGlvbklkIjoiMWNlNDAxYWUtM2NkOS00ODY1LTk4MzAtZjhhN2E0MGJmYzU5IiwiaWF0IjoxNjU1OTk1Nzc2fQ.DE1_ulwK_A7SdzZdXkeCsEw0bs9o_lzt2HO8zyWxSPg',
});

export const loadGatewayPaymentEnvs = (): Env['gateway_payment'] => ({
  gateway_url: process.env.GATEWAY_PAYMENT_URL || 'https://stage-gw-lydians.gazin.com.br',
  gateway_token:
    process.env.GATEWAY_PAYMENT_TOKEN ||
    'eyJ0eXAiOiJKV1QiLCJraWQiOiIwNDU0ZGFmYTgwZmM0YWFiYTYwMTc0NTM5YzRiMmFkMyIsImFsZyI6IlJTMjU2In0.eyJqdGkiOiIwZjY1ZTJiMC1hMWI2LTQzOTItYTQ5Ny0yYTE5MDI3MjJhYjkiLCJpc3MiOiJhZjlhMDg0MC00NWIwLTRiNzMtYWQ2MS00Njc3ZTIwZTQyNGYiLCJpYXQiOjE2NDk4ODQxNzQsInN1YiI6ImFmOWEwODQwLTQ1YjAtNGI3My1hZDYxLTQ2NzdlMjBlNDI0ZiIsImV4cCI6NDgwNTU1Nzc3NCwidHNpIjoic2VydmljZXMtc2lnbiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNlcnZpY2UiOnsibmFtZSI6IkFQSSBTZWd1cm9zIn19.oqNnjJTFCNO6mLpcIKe9iLmStOrOsNLLDnHUCTCw9S_NuhEl1T-i-rEVIFuNLy4d4E00c9F1eKyNdSPjrcem_v_tB8u74W4baTFLQ-Bx3HXXtlGVgs_8iVQqaAHvNAMGAuZ2ys0EYIYfQ_X2LbRa3CgkPzKWyovEsi7ERI73XgygCkxehime3fbmKvswRPJBSn0nE7eXqoUL06BZE3Wlr8y3gbQ3V3PSiUHd__x8g0K06dxPRSunRatvuY7iD46t8sU9Llnf7DVuJ2lh6-6FLIphytH8XZ1nWlGq3jYT0pY1U58VV0MxLoID1KQbCXnWnJeMgxTlskgXDzGDg3VC7A',
  gateway_cod_hist: Number(process.env.GATEWAY_PAYMENT_COD_HIST) || 201,
  gateway_cod_oper_cp: Number(process.env.GATEWAY_PAYMENT_COD_OPER_CP) || 1,
  gateway_timeout: Number(process.env.GATEWAY_PAYMENT_TIMEOUT) || 25,
});

export const loadSmsEnvs = (): Env['sms'] => ({
  url: process.env.SMS_URL || 'https://mmcenter.com.br/mmenviojson.aspx/ENVIOv2',
  user: process.env.SMS_USER || 'gazin_db1',
  password: process.env.SMS_PASSWORD || 'gazin_db1',
});

export const loadEmailEnvs = (): Env['mail'] => ({
  host: process.env.MAIL_HOST || 'smtp.office365.com',
  port: Number(process.env.MAIL_PORT) || 587,
  user: process.env.MAIL_USER || 'seguros@gazinbank.com.br',
  password: process.env.MAIL_PASSWORD || 'qmhkcsrzdcblnvqc',
  from: process.env.MAIL_FROM || 'seguros@gazinbank.com.br',
  mailMock: process.env.MAIL_MOCK,
});

export const loadRedisEnvs = (): Env['redis'] => ({
  uri: process.env.REDIS_URI || 'redis://localhost:6379',
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

export const loadFtpEnvs = (): Env['ftp'] => ({
  host: process.env.FTP_HOST || '10.0.200.191',
  password: process.env.FTP_PASSWORD || 'nJ091cOshpTPV8313c{cL7H.m(GtV0',
  port: Number(process.env.FTP_PORT || '21'),
  user: process.env.FTP_USER || 'ftp.bank-seguradora',
  secure: false,
});

export const loadFtpPathEnvs = () => ({
  dih: process.env.FTP_PATH_DIH || '/Hml_Processamento/Fechamento Diario/Movimentos/DIH e Micro. DIH',
  re: process.env.FTP_PATH_RE || '/Hml_Processamento/Fechamento Diario/Movimentos/Micro. Residencial/Emissao',
});

export const loadCronEnvs = (): Env['cron'] => ({
  exportDihService: process.env.CRON_EXPORT_DIH || CronExpression.EVERY_HOUR,
  exportReService: process.env.CRON_EXPORT_RE || CronExpression.EVERY_HOUR,
});

export const isDevOrTest = ['development', 'test'].includes(process.env.NODE_ENV);

export type Environments = 'development' | 'qa' | 'stage' | 'production' | 'test';

export type Env = {
  env: Environments;
  domain: string;
  port: number;
  sentry_dsn: string;
  redis: {
    uri: string;
    host: string;
    port: number;
    password: string;
  };
  admin: {
    username: string;
    password: string;
  };
  database: {
    host: string;
    database: string;
    port: number;
    username: string;
    password: string;
  };
  api_bank: {
    base_url: string;
    token_url: string;
    identification: string;
  };
  apolo_api: {
    url: string;
    token: string;
  };
  gateway_payment: {
    gateway_url: string;
    gateway_token: string;
    gateway_cod_hist: number;
    gateway_cod_oper_cp: number;
    gateway_timeout: number;
  };
  sms: {
    url: string;
    user: string;
    password: string;
  };
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
    mailMock: string;
  };
  ftp: {
    host: string;
    password: string;
    port: number;
    user: string;
    secure: boolean;
  };
  ftp_path: {
    dih: string;
    re: string;
  };
  cron: {
    exportDihService: string;
    exportReService: string;
  };
};
