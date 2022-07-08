import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PolicyStatusEnum } from '../constants';
import { AddressEntity } from './address.entity';
import { AgentEntity } from './agent.entity';
import { ExportEntity } from './export.entity';
import { InstallmentEntity } from './installment.entity';
import { InsuredEntity } from './insured.entity';
import { PlanEntity } from './plan.entity';
import { PolicyResidentialEntity } from './policy-residential.entity';
import { ColumnNumericTransformer, CurrentTimestamp } from './__utils';

@Entity({ name: 'apolices' })
export class PolicyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero_bilhete', length: 15 })
  ticket: string;

  @Column({ name: 'numero_sorte' })
  luckNumber: number;

  @Column({
    name: 'data_contratacao',
    default: CurrentTimestamp,
  })
  contractDate: Date;

  @Column({
    name: 'data_inicio_vigencia',
    type: 'date',
    nullable: true,
  })
  startDate: Date;

  @Column({
    name: 'data_fim_vigencia',
    type: 'date',
    nullable: true,
  })
  endDate: Date;

  @Column({
    name: 'representante_id',
    nullable: true,
  })
  agentId: number;

  @Column({
    name: 'exportacao_id',
    nullable: true,
  })
  exportId: number;

  @Column({
    name: 'plano_id',
    nullable: true,
  })
  planId: number;

  @Column({
    name: 'cliente_id',
    nullable: true,
  })
  insuredId: number;

  @ManyToOne(() => AgentEntity, (agent) => agent.policies)
  @JoinColumn({
    name: 'representante_id',
    referencedColumnName: 'id',
  })
  agent: AgentEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.policies)
  @JoinColumn({
    name: 'plano_id',
    referencedColumnName: 'id',
  })
  plan: PlanEntity;

  @ManyToOne(() => ExportEntity, (exportEntity) => exportEntity.policies)
  @JoinColumn({
    name: 'exportacao_id',
    referencedColumnName: 'id',
  })
  export: ExportEntity;

  @OneToMany(() => PolicyResidentialEntity, (policyResidentail) => policyResidentail.policy)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'apolice_id',
  })
  policiesResidential: PolicyResidentialEntity[];

  @OneToMany(() => InstallmentEntity, (installment) => installment.policy)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'apolice_id',
  })
  installments: InstallmentEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => InsuredEntity, (insured) => insured.policies)
  @JoinColumn({
    name: 'cliente_id',
    referencedColumnName: 'id',
  })
  insured: InsuredEntity;

  @Column({ name: 'status', type: 'enum', enum: PolicyStatusEnum, default: PolicyStatusEnum.ISSUED })
  status: PolicyStatusEnum;

  @Column({ name: 'data_cancelamento', nullable: true })
  cancellationDate?: Date;

  @Column({ name: 'data_fim_cobertura', nullable: true })
  coverageEndDate?: Date;

  @Column({
    name: 'valor_total',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0,
  })
  totalValue: number;

  @Column({
    name: 'valor_liquido',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0,
  })
  liquidValue: number;

  @Column({
    name: 'valor_iof',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0,
  })
  iofValue: number;

  @Column({ name: 'bilhete_pdf', nullable: true })
  ticketPDF: string;

  @Column({ name: 'endereco_id' })
  addressId: number;

  @ManyToOne(() => AddressEntity, (address) => address.policy)
  @JoinColumn({
    name: 'endereco_id',
    referencedColumnName: 'id',
  })
  address: AddressEntity;
}
