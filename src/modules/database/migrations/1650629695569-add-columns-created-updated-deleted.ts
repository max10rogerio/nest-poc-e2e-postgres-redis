import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnsCreatedUpdatedDeleted1650629695569 implements MigrationInterface {
  name = 'addColumnsCreatedUpdatedDeleted1650629695569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "produtos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "produtos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "produtos" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "planos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "planos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "planos" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "plano_coberturas" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "plano_coberturas" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "plano_coberturas" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "coberturas" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "coberturas" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "plano_coberturas" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "plano_coberturas" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "plano_coberturas" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "planos" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "planos" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "planos" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "tipos_cobertura" DROP COLUMN "created_at"`);
  }
}
