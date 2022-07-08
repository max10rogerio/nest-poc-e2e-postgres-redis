import { ProductTypeEnum } from 'src/modules/products/constants';
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlanEntity } from './plan.entity';
import { ProductAgentEntity } from './product-agent.entity';

@Entity({
  name: 'produtos',
  orderBy: {
    order: 'ASC',
  },
})
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'descricao', type: 'text' })
  description: string;

  @Column({ name: 'icone', nullable: true })
  icon?: string;

  @Column({ name: 'numero_grupo_ramo' })
  branchGroupNumber: number;

  @Column({ name: 'numero_ramo' })
  branchNumber: number;

  @Column({
    name: 'tipo',
    type: 'enum',
    enum: ProductTypeEnum,
    default: ProductTypeEnum.DEFAULT,
  })
  type: ProductTypeEnum;

  @Column({ name: 'termo_pdf', nullable: true })
  termsPDF?: string;

  @Column({ name: 'ordem', default: 1 })
  order: number;

  @Column({ name: 'codigo_susep', nullable: true })
  susepCode?: number;

  @Column({ name: 'nome_contrato', nullable: true })
  contractName?: string;

  @OneToMany(() => PlanEntity, (plan) => plan.product)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'produto_id',
  })
  plans: PlanEntity[];

  @OneToMany(() => ProductAgentEntity, (productAgent) => productAgent.product)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'produto_id',
  })
  productAgent: ProductAgentEntity[];
}
