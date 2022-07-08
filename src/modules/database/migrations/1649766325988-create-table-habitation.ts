import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableHabitation1649766325988 implements MigrationInterface {
  name = 'createTableHabitation1649766325988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "habitacao" ("id" SERIAL NOT NULL, "codigo" character varying(2) NOT NULL, "descricao" character varying NOT NULL, "tipos_habitacao_id" integer NOT NULL, CONSTRAINT "UQ_a306c7cb037e79579500bfe9ab0" UNIQUE ("codigo"), CONSTRAINT "PK_6e14bd5e41483f0c4dd908755b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tipos_habitacao" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "UQ_e8ffb1515ab335a80ddd0cf3b9e" UNIQUE ("key"), CONSTRAINT "PK_e789529aebd0a896f942ea17d1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "habitacao" ADD CONSTRAINT "FK_76a7039912c2134363d718ff25d" FOREIGN KEY ("tipos_habitacao_id") REFERENCES "tipos_habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "habitacao" DROP CONSTRAINT "FK_76a7039912c2134363d718ff25d"`);
    await queryRunner.query(`DROP TABLE "tipos_habitacao"`);
    await queryRunner.query(`DROP TABLE "habitacao"`);
  }
}
