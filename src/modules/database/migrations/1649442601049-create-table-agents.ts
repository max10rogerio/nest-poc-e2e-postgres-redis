import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableAgents1649442601049 implements MigrationInterface {
  name = 'createTableAgents1649442601049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "representantes" ("id" SERIAL NOT NULL, "cnpj" character varying NOT NULL, "nome" character varying NOT NULL, "numero_contrato" integer NOT NULL, "codigo_susep" integer NOT NULL, "tipos_representante_id" integer NOT NULL, CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "representantes" ADD CONSTRAINT "FK_c9bc0809b1b494685cd143a1481" FOREIGN KEY ("tipos_representante_id") REFERENCES "tipos_representante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "representantes" DROP CONSTRAINT "FK_c9bc0809b1b494685cd143a1481"`);
    await queryRunner.query(`DROP TABLE "representantes"`);
  }
}
