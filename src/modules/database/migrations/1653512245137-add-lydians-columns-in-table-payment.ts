import { MigrationInterface, QueryRunner } from 'typeorm';

export class addLydiansColumnsInTablePayment1653512245137 implements MigrationInterface {
  name = 'addLydiansColumnsInTablePayment1653512245137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pagamentos" ADD "seq_lanc" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "pagamentos" ADD "id_lydians" character varying(36) NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pagamentos" DROP COLUMN "id_lydians"`);
    await queryRunner.query(`ALTER TABLE "pagamentos" DROP COLUMN "seq_lanc"`);
  }
}
