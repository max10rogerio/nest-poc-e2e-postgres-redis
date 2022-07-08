declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      DOMAIN?: string;
      NODE_ENV?: Environments;
      POSTGRES_HOST?: string;
      POSTGRES_DATABASE?: string;
      POSTGRES_PORT?: string;
      POSTGRES_USER?: string;
      POSTGRES_PASSWORD?: string;
      SENTRY_DSN?: string;
      ADMIN_USER?: string;
      ADMIN_PASSWORD?: string;
      API_BANK_BASE_URL?: string;
      API_BANK_TOKEN_URL?: string;
      API_BANK_IDENTIFICATION?: string;
      APOLO_URL?: string;
      APOLO_TOKEN?: string;
      ADMIN_USER?: string;
      ADMIN_PASSWORD?: string;
      API_BANK_BASE_URL?: string;
      API_BANK_TOKEN_URL?: string;
      API_BANK_IDENTIFICATION?: string;
      GATEWAY_PAYMENT_URL?: string;
      GATEWAY_PAYMENT_TOKEN?: string;
      GATEWAY_PAYMENT_COD_HIST?: string;
      GATEWAY_PAYMENT_COD_OPER_CP?: string;
      GATEWAY_PAYMENT_TIMEOUT?: string;
      REDIS_URI?: string;
      FTP_HOST?: string;
      FTP_PASSWORD?: string;
      FTP_PORT?: string;
      FTP_USER?: string;
      FTP_PATH_DIH?: string;
      FTP_PATH_RE?: string;
      SMS_URL?: string;
      SMS_USER?: string;
      SMS_PASSWORD?: string;
      MAIL_HOST?: string;
      MAIL_PORT?: string;
      MAIL_USER?: string;
      MAIL_PASSWORD?: string;
      MAIL_FROM?: string;
      MAIL_MOCK?: string;
      REDIS_URI?: string;
      REDIS_HOST?: string;
      REDIS_PORT?: string;
      REDIS_PASSWORD?: string;
      CRON_EXPORT_DIH: string;
      CRON_EXPORT_RE: string;
    }
  }
}

export {};
