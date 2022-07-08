import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableProducts1648730039897 implements MigrationInterface {
  name = 'createTableProducts1648730039897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table "produtos" ("id" SERIAL not null,
      "descricao" text not null,
      "numero_grupo_ramo" integer not null,
      "numero_ramo" integer not null,
      constraint "PK_a5d976312809192261ed96174f3" primary key ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "produtos"`);
  }
}
