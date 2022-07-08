import { MigrationInterface, QueryRunner } from 'typeorm';

export class setPkAutoIncrementInTableCoverages1648755691201 implements MigrationInterface {
  name = 'setPkAutoIncrementInTableCoverages1648755691201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "coberturas_id_seq" OWNED BY "coberturas"."id"`);
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "id" SET DEFAULT nextval('"coberturas_id_seq"')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coberturas" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "coberturas_id_seq"`);
  }
}
