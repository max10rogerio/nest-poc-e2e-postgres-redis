import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableExport1651764018761 implements MigrationInterface {
  name = 'createTableExport1651764018761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."exportacoes_tipo_enum" AS ENUM('DIH', 'RE')`);
    await queryRunner.query(`CREATE TYPE "public"."status_enum" AS ENUM('Sucesso', 'Erro')`);
    await queryRunner.query(
      `CREATE TABLE "exportacoes" ("id" SERIAL NOT NULL, "tipo" "public"."exportacoes_tipo_enum" NOT NULL, "log" character varying NOT NULL, "arquivo" character varying NOT NULL, "status" "public"."status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7a5a679239c1f6cff6703104691" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "apolices" ADD "exportacao_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "apolices" ADD CONSTRAINT "FK_7cb751737873fd6b7bccaa110f4" FOREIGN KEY ("exportacao_id") REFERENCES "exportacoes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" DROP CONSTRAINT "FK_7cb751737873fd6b7bccaa110f4"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "exportacao_id"`);
    await queryRunner.query(`DROP TABLE "exportacoes"`);
    await queryRunner.query(`DROP TYPE "public"."status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."exportacoes_tipo_enum"`);
  }
}
