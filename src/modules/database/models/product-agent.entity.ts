import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AgentEntity } from './agent.entity';
import { ProductEntity } from './product.entity';
import { ColumnNumericTransformer } from './__utils';

@Entity({ name: 'produto_representante' })
export class ProductAgentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'produto_id' })
  productId: number;

  @Column({ name: 'representante_id' })
  agentId: number;

  @Column({ name: 'numero_contrato' })
  contractNumber: number;

  @Column({
    name: 'percentual_comissao',
    default: 0,
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  commissionPercentage: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => ProductEntity, (product) => product.productAgent)
  @JoinColumn({
    name: 'produto_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  @ManyToOne(() => AgentEntity, (agent) => agent.productAgent)
  @JoinColumn({
    name: 'representante_id',
    referencedColumnName: 'id',
  })
  agent: AgentEntity;
}
