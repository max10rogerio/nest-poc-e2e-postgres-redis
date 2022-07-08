import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableCoveragesTypes1648746116571 implements MigrationInterface {
  name = 'createTableCoveragesTypes1648746116571';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tipos_cobertura" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "PK_edf1f3dce9fd20332e251db33ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "tipos_cobertura_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "coberturas" ADD CONSTRAINT "FK_e13441186dca79d3c6279ce817b" FOREIGN KEY ("tipos_cobertura_id") REFERENCES "tipos_cobertura"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coberturas" DROP CONSTRAINT "FK_e13441186dca79d3c6279ce817b"`);
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "tipos_cobertura_id"`);
    await queryRunner.query(`DROP TABLE "tipos_cobertura"`);
  }
}
