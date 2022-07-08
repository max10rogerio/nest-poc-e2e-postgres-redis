import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTernaryTableCoveragePlan1648835029891 implements MigrationInterface {
  name = 'addTernaryTableCoveragePlan1648835029891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coberturas" DROP CONSTRAINT "FK_5c43c79bee61ee88689612ae5d5"`);
    await queryRunner.query(
      `CREATE TABLE "plano_coberturas" ("id" SERIAL NOT NULL, "plano_id" integer NOT NULL, "cobertura_id" integer NOT NULL, "valor_capital" numeric(10,2) NOT NULL, "texto_capital" character varying, "texto_resumo" text, "texto_carencia" text, "texto_franquia" text, CONSTRAINT "PK_86846317ed15b7bac8b1a680d2c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "valor_capital"`);
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "observacao"`);
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "detalhes"`);
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "texto_carencia"`);
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "texto_franquia"`);
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "plano_id"`);
    await queryRunner.query(
      `ALTER TABLE "plano_coberturas" ADD CONSTRAINT "FK_5581a508ee9dbe101bd1deb1cf2" FOREIGN KEY ("plano_id") REFERENCES "planos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plano_coberturas" ADD CONSTRAINT "FK_b72d91dd5f404796f98c37d1b82" FOREIGN KEY ("cobertura_id") REFERENCES "coberturas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plano_coberturas" DROP CONSTRAINT "FK_b72d91dd5f404796f98c37d1b82"`);
    await queryRunner.query(`ALTER TABLE "plano_coberturas" DROP CONSTRAINT "FK_5581a508ee9dbe101bd1deb1cf2"`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "plano_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "texto_franquia" text`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "texto_carencia" text`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "detalhes" text`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "observacao" text`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "valor_capital" numeric(10,2) NOT NULL`);
    await queryRunner.query(`DROP TABLE "plano_coberturas"`);
    await queryRunner.query(
      `ALTER TABLE "coberturas" ADD CONSTRAINT "FK_5c43c79bee61ee88689612ae5d5" FOREIGN KEY ("plano_id") REFERENCES "planos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
