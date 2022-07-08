import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIndexInColumnCpf1650646357892 implements MigrationInterface {
  name = 'addIndexInColumnCpf1650646357892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "IDX_efe23a9c024592bd5540344f6b" ON "log_pagamentos" ("cpf") `);
    await queryRunner.query(`CREATE INDEX "IDX_87269fab5aad6a7cfe8121f006" ON "pagamentos" ("cpf") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_87269fab5aad6a7cfe8121f006"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_efe23a9c024592bd5540344f6b"`);
  }
}
