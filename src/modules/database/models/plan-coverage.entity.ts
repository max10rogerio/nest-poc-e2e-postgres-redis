import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CoverageEntity } from './coverage.entity';
import { PlanEntity } from './plan.entity';
import { ColumnNumericTransformer } from './__utils';

@Entity({ name: 'plano_coberturas' })
export class PlanCoverageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'plano_id' })
  planId: number;

  @Column({ name: 'cobertura_id' })
  coverageId: number;

  @Column({
    name: 'valor_capital',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  capitalValue: number;

  @Column({ name: 'texto_general', type: 'text', nullable: true })
  generalText: string;

  @Column({ name: 'texto_capital', nullable: true })
  capitalText: string;

  @Column({ name: 'texto_resumo', type: 'text', nullable: true })
  summaryText: string;

  @Column({ name: 'texto_carencia', type: 'text', nullable: true })
  shortageText?: string;

  @Column({ name: 'texto_franquia', type: 'text', nullable: true })
  franchiseText?: string;

  @Column({
    name: 'valor_premio',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  prizeValue?: number;

  @ManyToOne(() => PlanEntity, (plan) => plan.planCoverage)
  @JoinColumn({
    name: 'plano_id',
    referencedColumnName: 'id',
  })
  plan: PlanEntity;

  @ManyToOne(() => CoverageEntity, (coverage) => coverage.planCoverage)
  @JoinColumn({
    name: 'cobertura_id',
    referencedColumnName: 'id',
  })
  coverage: CoverageEntity;
}
