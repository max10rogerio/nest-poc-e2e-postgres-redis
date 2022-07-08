import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDateColumnsInTableLoterryConfig1651240964277 implements MigrationInterface {
  name = 'addDateColumnsInTableLoterryConfig1651240964277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "loteria_configuracao" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "loteria_configuracao" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "loteria_configuracao" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "loteria_configuracao" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "loteria_configuracao" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "loteria_configuracao" DROP COLUMN "created_at"`);
  }
}
