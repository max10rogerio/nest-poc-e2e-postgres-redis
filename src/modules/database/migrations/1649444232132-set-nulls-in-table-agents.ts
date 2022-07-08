import { MigrationInterface, QueryRunner } from 'typeorm';

export class setNullsInTableAgents1649444232132 implements MigrationInterface {
  name = 'setNullsInTableAgents1649444232132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "representantes" DROP CONSTRAINT "FK_c9bc0809b1b494685cd143a1481"`);
    await queryRunner.query(`ALTER TABLE "representantes" ALTER COLUMN "numero_contrato" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "representantes" ALTER COLUMN "codigo_susep" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "representantes" ADD CONSTRAINT "FK_d91bad30f22da96352eb59fdef7" FOREIGN KEY ("tipos_representante_id") REFERENCES "tipos_representante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "representantes" DROP CONSTRAINT "FK_d91bad30f22da96352eb59fdef7"`);
    await queryRunner.query(`ALTER TABLE "representantes" ALTER COLUMN "codigo_susep" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "representantes" ALTER COLUMN "numero_contrato" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "representantes" ADD CONSTRAINT "FK_c9bc0809b1b494685cd143a1481" FOREIGN KEY ("tipos_representante_id") REFERENCES "tipos_representante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
