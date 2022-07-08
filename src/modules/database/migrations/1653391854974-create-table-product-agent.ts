import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableProductAgent1653391854974 implements MigrationInterface {
  name = 'createTableProductAgent1653391854974';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "produto_representante" ("id" SERIAL NOT NULL, "produto_id" integer NOT NULL, "representante_id" integer NOT NULL, "numero_contrato" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_4a5b0bb9e301581c27d5c64e7ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_representante" ADD CONSTRAINT "FK_7604dfa812318bde9c2253d7439" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_representante" ADD CONSTRAINT "FK_6f776481f7cb5629e4286343038" FOREIGN KEY ("representante_id") REFERENCES "representantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produto_representante" DROP CONSTRAINT "FK_6f776481f7cb5629e4286343038"`);
    await queryRunner.query(`ALTER TABLE "produto_representante" DROP CONSTRAINT "FK_7604dfa812318bde9c2253d7439"`);
    await queryRunner.query(`DROP TABLE "produto_representante"`);
  }
}
