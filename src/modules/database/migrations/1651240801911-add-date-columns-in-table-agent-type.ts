import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDateColumnsInTableAgentType1651240801911 implements MigrationInterface {
  name = 'addDateColumnsInTableAgentType1651240801911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_representante" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tipos_representante" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tipos_representante" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_representante" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "tipos_representante" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "tipos_representante" DROP COLUMN "created_at"`);
  }
}
