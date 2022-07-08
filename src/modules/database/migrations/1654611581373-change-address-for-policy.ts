import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeAddressForPolicy1654611581373 implements MigrationInterface {
  name = 'changeAddressForPolicy1654611581373';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_07f70f288d6fbae21a5032d05fc"`);
    await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "endereco_id"`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "endereco_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "apolices" ADD CONSTRAINT "FK_6bec4314c125f9495a23b453f57" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices" DROP CONSTRAINT "FK_6bec4314c125f9495a23b453f57"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "endereco_id"`);
    await queryRunner.query(`ALTER TABLE "clientes" ADD "endereco_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "clientes" ADD CONSTRAINT "FK_07f70f288d6fbae21a5032d05fc" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
