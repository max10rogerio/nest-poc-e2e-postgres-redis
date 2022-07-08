import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablePolicy1649443244950 implements MigrationInterface {
  name = 'createTablePolicy1649443244950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "apolices" ("id" SERIAL NOT NULL, "numero_bilhete" character varying(15) NOT NULL, CONSTRAINT "PK_fc70c75d8e1c30c8ff9853404ee" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "apolices"`);
  }
}
