import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEnumInTableAgentType1651002259990 implements MigrationInterface {
  name = 'createEnumInTableAgentType1651002259990';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_representante" DROP CONSTRAINT "UQ_ee9cdfb6fc203abe63c341c1852"`);
    await queryRunner.query(`ALTER TABLE "tipos_representante" DROP COLUMN "key"`);
    await queryRunner.query(
      `CREATE TYPE "public"."tipos_representante_key_enum" AS ENUM('broker', 'agent', 'insurer')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tipos_representante" ADD "key" "public"."tipos_representante_key_enum" NOT NULL DEFAULT 'agent'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tipos_representante" DROP COLUMN "key"`);
    await queryRunner.query(`DROP TYPE "public"."tipos_representante_key_enum"`);
    await queryRunner.query(`ALTER TABLE "tipos_representante" ADD "key" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "tipos_representante" ADD CONSTRAINT "UQ_ee9cdfb6fc203abe63c341c1852" UNIQUE ("key")`,
    );
  }
}
