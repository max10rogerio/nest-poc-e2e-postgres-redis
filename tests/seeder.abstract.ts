import { Connection, getConnection, Repository } from 'typeorm';

export abstract class SeederAbstract {
  connection: Connection;

  constructor() {
    this.connection = getConnection();
  }

  public async truncateTable(table: string): Promise<void> {
    await this.connection.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
  }

  public async enableConstraints<T>(repository: Repository<T>): Promise<void> {
    await this.connection.query(`ALTER TABLE ${repository.metadata.tableName} ENABLE TRIGGER ALL;`);
  }

  public async disableConstraints<T>(repository: Repository<T>): Promise<void> {
    await this.connection.query(`ALTER TABLE ${repository.metadata.tableName} DISABLE TRIGGER ALL;`);
  }

  abstract seed(...args: any[]): Promise<any>;

  abstract truncate(): Promise<void>;
}
