import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CoverageTypeEntity } from './coverage-type.entity';
import { PlanCoverageEntity } from './plan-coverage.entity';

@Entity({
  name: 'coberturas',
  orderBy: {
    order: 'ASC',
  },
})
export class CoverageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'icone', nullable: true })
  icon?: string;

  @Column({ name: 'titulo' })
  title: string;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'tipos_cobertura_id' })
  coverageTypeId: number;

  @Column({ name: 'ordem', default: 1 })
  order: number;

  @ManyToOne(() => CoverageTypeEntity, (plan) => plan.coverages)
  @JoinColumn({
    name: 'tipos_cobertura_id',
    referencedColumnName: 'id',
  })
  coverageType: CoverageTypeEntity;

  @OneToMany(() => PlanCoverageEntity, (planCoverage) => planCoverage.coverage)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'cobertura_id',
  })
  planCoverage: PlanCoverageEntity;
}
