import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableAgentsTypes1649441986074 implements MigrationInterface {
  name = 'createTableAgentsTypes1649441986074';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tipos_representante" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "UQ_ee9cdfb6fc203abe63c341c1852" UNIQUE ("key"), CONSTRAINT "PK_d4e2494c19115b7b634ec9965f4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tipos_representante"`);
  }
}
