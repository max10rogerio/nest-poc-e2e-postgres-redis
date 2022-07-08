import { MigrationInterface, QueryRunner } from 'typeorm';

export class addValueColumnsInTablePolicy1652789882346 implements MigrationInterface {
  name = 'addValueColumnsInTablePolicy1652789882346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" RENAME COLUMN "data_inicial" TO "data_inicio_vigencia"`);
    await queryRunner.query(`ALTER TABLE "apolices" RENAME COLUMN "data_final" TO "data_fim_vigencia"`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "valor_total" numeric(10,2) NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "valor_liquido" numeric(10,2) NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "valor_iof" numeric(10,2) NOT NULL DEFAULT 0`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "valor_iof"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "valor_liquido"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "valor_total"`);
    await queryRunner.query(`ALTER TABLE "apolices" RENAME COLUMN "data_fim_vigencia" TO "data_final"`);
    await queryRunner.query(`ALTER TABLE "apolices" RENAME COLUMN "data_inicio_vigencia" TO "data_inicial"`);
  }
}
