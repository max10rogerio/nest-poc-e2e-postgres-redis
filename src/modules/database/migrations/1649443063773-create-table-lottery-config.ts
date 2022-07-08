import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableLotteryConfig1649443063773 implements MigrationInterface {
  name = 'createTableLotteryConfig1649443063773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "loteria_configuracao" ("id" SERIAL NOT NULL, "numero_inicial" integer NOT NULL, "numero_final" integer NOT NULL, "ultimo_numero" integer NOT NULL, CONSTRAINT "PK_237df7c8676796fd9ea736dde3a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "loteria_configuracao"`);
  }
}
