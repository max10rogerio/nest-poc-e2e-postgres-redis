import { LogPaymentTypeStatusEnum } from 'src/modules/common/constants';
import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from './__utils';

@Entity({ name: 'log_pagamentos' })
export class LogPaymentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ name: 'cpf', type: 'varchar', length: 14 })
  cpf: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Column({
    name: 'valor',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  value: number;

  @Column({ name: 'status_code', type: 'smallint', width: 3 })
  statusCode: number;

  @Column({ name: 'requisicao', type: 'jsonb' })
  request: string;

  @Column({ name: 'resposta', type: 'jsonb', nullable: true })
  response: string;

  @Column({ name: 'tipo', type: 'enum', enum: LogPaymentTypeStatusEnum, default: LogPaymentTypeStatusEnum.PAYMENT })
  type: LogPaymentTypeStatusEnum;
}
