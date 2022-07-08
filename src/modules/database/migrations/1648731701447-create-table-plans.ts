import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablePlans1648731701447 implements MigrationInterface {
  name = 'createTablePlans1648731701447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "planos" ("id" SERIAL NOT NULL, "descricao" text NOT NULL, "resumo" character varying NOT NULL, "produto_id" integer NOT NULL, "preco_premio" numeric(10,2) NOT NULL, CONSTRAINT "PK_683c959790c0f44669997e1a558" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "planos" ADD CONSTRAINT "FK_6fb8030de380562f8e086210d16" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planos" DROP CONSTRAINT "FK_6fb8030de380562f8e086210d16"`);
    await queryRunner.query(`DROP TABLE "planos"`);
  }
}
