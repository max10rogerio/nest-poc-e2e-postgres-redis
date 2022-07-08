import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableLogPayments1650389387651 implements MigrationInterface {
  name = 'createTableLogPayments1650389387651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "log_pagamentos" ("id" SERIAL NOT NULL, "cpf" character varying(14) NOT NULL, "valor" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "status_code" smallint NOT NULL, "requisicao" jsonb NOT NULL, "resposta" jsonb, CONSTRAINT "PK_796b6521cd4977b8df85b7fc3a5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "log_pagamentos"`);
  }
}
