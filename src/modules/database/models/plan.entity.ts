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
import { PlanCoverageEntity } from './plan-coverage.entity';
import { PolicyEntity } from './policy.entity';
import { ProductEntity } from './product.entity';
import { ColumnNumericTransformer } from './__utils';

@Entity({ name: 'planos' })
export class PlanEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'codigo', nullable: true })
  code?: number;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'resumo', nullable: true })
  summary?: string;

  @Column({ name: 'produto_id' })
  productId: number;

  @Column({
    name: 'preco_premio',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  prizeValue: number;

  @Column({
    name: 'quantidade_parcelas',
    type: 'smallint',
    nullable: true,
  })
  numberInstallments?: number;

  @Column({
    name: 'valor_iof',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  iofValue?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => ProductEntity, (product) => product.plans)
  @JoinColumn({
    name: 'produto_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  @OneToMany(() => PlanCoverageEntity, (planCoverage) => planCoverage.plan)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'plano_id',
  })
  planCoverage: PlanCoverageEntity[];

  @OneToMany(() => PolicyEntity, (policy) => policy.plan)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'plano_id',
  })
  policies: PolicyEntity[];
}
