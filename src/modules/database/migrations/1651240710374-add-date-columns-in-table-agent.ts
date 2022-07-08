import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDateColumnsInTableAgent1651240710374 implements MigrationInterface {
  name = 'addDateColumnsInTableAgent1651240710374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "representantes" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "representantes" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "representantes" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "representantes" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "representantes" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "representantes" DROP COLUMN "created_at"`);
  }
}
