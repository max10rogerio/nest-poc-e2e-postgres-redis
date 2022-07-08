import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablePayments1650391362485 implements MigrationInterface {
  name = 'createTablePayments1650391362485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pagamentos" ("id" SERIAL NOT NULL, "cpf" character varying(14) NOT NULL, "valor" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,"id_log" integer NOT NULL, CONSTRAINT "REL_4d3141ba026f2ee387abe0512d" UNIQUE ("id_log"), CONSTRAINT "PK_0127f8bc8386b0e522c7cc5a9fc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pagamentos" ADD CONSTRAINT "FK_4d3141ba026f2ee387abe0512d5" FOREIGN KEY ("id_log") REFERENCES "log_pagamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pagamentos" DROP CONSTRAINT "FK_4d3141ba026f2ee387abe0512d5"`);
    await queryRunner.query(`DROP TABLE "pagamentos"`);
  }
}
