import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntitiesPayment1650983578282 implements MigrationInterface {
  name = 'addEntitiesPayment1650983578282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."clientes_genero_enum" AS ENUM('M', 'F')`);
    await queryRunner.query(
      `CREATE TYPE "public"."clientes_estado_civil_enum" AS ENUM('Solteiro', 'Casado', 'Separado', 'Divorciado', 'Viúvo')`,
    );
    await queryRunner.query(
      `CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "cpf" character varying NOT NULL, "nome" character varying NOT NULL, "data_nascimento" date NOT NULL, "genero" "public"."clientes_genero_enum" NOT NULL, "estado_civil" "public"."clientes_estado_civil_enum" NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, "endereco_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."parcelas_status_enum" AS ENUM('Aberta', 'Cancelada', 'Quitada')`);
    await queryRunner.query(
      `CREATE TABLE "parcelas" ("id" SERIAL NOT NULL, "numero" integer NOT NULL, "valor_total" numeric(10,2) NOT NULL, "valor_liquido" numeric(10,2) NOT NULL, "valor_iof" numeric(10,2) NOT NULL, "status" "public"."parcelas_status_enum" NOT NULL, "tentativas" integer NOT NULL, "agencia" character varying NOT NULL, "conta" character varying NOT NULL, "codigo_transacao" integer NOT NULL, "apolice_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_2081f431fed935a5bb1da9f420b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "imoveis" ("id" SERIAL NOT NULL, "tipo_moradia_id" integer NOT NULL, "tipo_construcao_id" integer NOT NULL, "tipo_imovel_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_618741e54874dbf5c62e2546699" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "apolices_residenciais" ("id" SERIAL NOT NULL, "apolice_id" integer NOT NULL, "endereco_id" integer NOT NULL, "imovel_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_bb22953e84ad95ab51b4f43e1d6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enderecos" ("id" SERIAL NOT NULL, "cep" character varying NOT NULL, "rua" character varying NOT NULL, "numero" character varying NOT NULL, "bairro" character varying NOT NULL, "complemento" character varying NOT NULL, "cidade" character varying NOT NULL, "uf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "representantes" ADD "nome_corretor" character varying`);
    await queryRunner.query(`ALTER TABLE "plano_coberturas" ADD "valor_premio" numeric(10,2)`);
    await queryRunner.query(`ALTER TABLE "planos" ADD "codigo" integer`);
    await queryRunner.query(`ALTER TABLE "planos" ADD "quantidade_parcelas" smallint`);
    await queryRunner.query(`ALTER TABLE "planos" ADD "valor_iof" numeric(10,2)`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "data_contratacao" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "data_inicial" date`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "data_final" date`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "representante_id" integer`);
    await queryRunner.query(`ALTER TABLE "apolices" ADD "plano_id" integer`);
    await queryRunner.query(`CREATE TYPE "public"."produtos_tipo_enum" AS ENUM('Padrão', 'Residencial')`);
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "tipo" "public"."produtos_tipo_enum" NOT NULL DEFAULT 'Padrão'`,
    );
    await queryRunner.query(
      `ALTER TABLE "clientes" ADD CONSTRAINT "FK_07f70f288d6fbae21a5032d05fc" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "parcelas" ADD CONSTRAINT "FK_d860e5429867996040b275100fe" FOREIGN KEY ("apolice_id") REFERENCES "apolices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apolices" ADD CONSTRAINT "FK_50972dd714495257cbdbb7c03b6" FOREIGN KEY ("representante_id") REFERENCES "representantes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apolices" ADD CONSTRAINT "FK_c528457e3b27400c4196d46940e" FOREIGN KEY ("plano_id") REFERENCES "planos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "imoveis" ADD CONSTRAINT "FK_bdadc03219a099180824c4cfd2d" FOREIGN KEY ("tipo_moradia_id") REFERENCES "tipos_habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "imoveis" ADD CONSTRAINT "FK_e0eb41ff001d8fb48ea468bcc94" FOREIGN KEY ("tipo_construcao_id") REFERENCES "tipos_habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "imoveis" ADD CONSTRAINT "FK_64a8e5310668b56c3714a037992" FOREIGN KEY ("tipo_imovel_id") REFERENCES "tipos_habitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apolices_residenciais" ADD CONSTRAINT "FK_d37c5a0a1acc6fc76aeba3c17ea" FOREIGN KEY ("apolice_id") REFERENCES "apolices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apolices_residenciais" ADD CONSTRAINT "FK_f64be42352322a8670f6df04a27" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apolices_residenciais" ADD CONSTRAINT "FK_bde5ff56b74fd46d48066666e1d" FOREIGN KEY ("imovel_id") REFERENCES "imoveis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apolices_residenciais" DROP CONSTRAINT "FK_bde5ff56b74fd46d48066666e1d"`);
    await queryRunner.query(`ALTER TABLE "apolices_residenciais" DROP CONSTRAINT "FK_f64be42352322a8670f6df04a27"`);
    await queryRunner.query(`ALTER TABLE "apolices_residenciais" DROP CONSTRAINT "FK_d37c5a0a1acc6fc76aeba3c17ea"`);
    await queryRunner.query(`ALTER TABLE "imoveis" DROP CONSTRAINT "FK_64a8e5310668b56c3714a037992"`);
    await queryRunner.query(`ALTER TABLE "imoveis" DROP CONSTRAINT "FK_e0eb41ff001d8fb48ea468bcc94"`);
    await queryRunner.query(`ALTER TABLE "imoveis" DROP CONSTRAINT "FK_bdadc03219a099180824c4cfd2d"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP CONSTRAINT "FK_c528457e3b27400c4196d46940e"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP CONSTRAINT "FK_50972dd714495257cbdbb7c03b6"`);
    await queryRunner.query(`ALTER TABLE "parcelas" DROP CONSTRAINT "FK_d860e5429867996040b275100fe"`);
    await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_07f70f288d6fbae21a5032d05fc"`);
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "tipo"`);
    await queryRunner.query(`DROP TYPE "public"."produtos_tipo_enum"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "plano_id"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "representante_id"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "data_final"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "data_inicial"`);
    await queryRunner.query(`ALTER TABLE "apolices" DROP COLUMN "data_contratacao"`);
    await queryRunner.query(`ALTER TABLE "planos" DROP COLUMN "valor_iof"`);
    await queryRunner.query(`ALTER TABLE "planos" DROP COLUMN "quantidade_parcelas"`);
    await queryRunner.query(`ALTER TABLE "planos" DROP COLUMN "codigo"`);
    await queryRunner.query(`ALTER TABLE "plano_coberturas" DROP COLUMN "valor_premio"`);
    await queryRunner.query(`ALTER TABLE "representantes" DROP COLUMN "nome_corretor"`);
    await queryRunner.query(`DROP TABLE "enderecos"`);
    await queryRunner.query(`DROP TABLE "apolices_residenciais"`);
    await queryRunner.query(`DROP TABLE "imoveis"`);
    await queryRunner.query(`DROP TABLE "parcelas"`);
    await queryRunner.query(`DROP TYPE "public"."parcelas_status_enum"`);
    await queryRunner.query(`DROP TABLE "clientes"`);
    await queryRunner.query(`DROP TYPE "public"."clientes_estado_civil_enum"`);
    await queryRunner.query(`DROP TYPE "public"."clientes_genero_enum"`);
  }
}
