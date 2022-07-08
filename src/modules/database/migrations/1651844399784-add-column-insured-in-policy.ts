import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnInsuredInPolicy1651844399784 implements MigrationInterface {
  name = 'addColumnInsuredInPolicy1651844399784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" ADD "cliente_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "apolices" ADD CONSTRAINT "FK_cc353e7e52dd2f78129066fb57d" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" DROP CONSTRAINT "FK_cc353e7e52dd2f78129066fb57d"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "cliente_id"`);
  }
}
