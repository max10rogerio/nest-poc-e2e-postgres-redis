import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableCoverage1648745330903 implements MigrationInterface {
  name = 'createTableCoverage1648745330903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "coberturas" ("id" integer NOT NULL, "icone" character varying NOT NULL, "valor_capital" numeric(10,2) NOT NULL, "titulo" character varying NOT NULL, "descricao" text NOT NULL, "observacao" text NOT NULL, "detalhes" text NOT NULL, "texto_carencia" text NOT NULL, "texto_franquia" text NOT NULL, "plano_id" integer NOT NULL, CONSTRAINT "PK_c37b6399138a3b6c40e954d4f06" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "coberturas" ADD CONSTRAINT "FK_5c43c79bee61ee88689612ae5d5" FOREIGN KEY ("plano_id") REFERENCES "planos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coberturas" DROP CONSTRAINT "FK_5c43c79bee61ee88689612ae5d5"`);
    await queryRunner.query(`DROP TABLE "coberturas"`);
  }
}
