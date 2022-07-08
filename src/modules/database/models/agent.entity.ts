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
import { AgentTypeEntity } from './agent-type.entity';
import { PolicyEntity } from './policy.entity';
import { ProductAgentEntity } from './product-agent.entity';

@Entity({ name: 'representantes' })
export class AgentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnpj: string;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'codigo_susep', nullable: true })
  susepCode?: number;

  @Column({ name: 'nome_corretor', nullable: true })
  brokerName?: string;

  @Column({ name: 'tipos_representante_id' })
  agentTypeId: number;

  @ManyToOne(() => AgentTypeEntity, (agentType) => agentType.agents)
  @JoinColumn({
    name: 'tipos_representante_id',
    referencedColumnName: 'id',
  })
  agentType: AgentTypeEntity;

  @OneToMany(() => PolicyEntity, (policy) => policy.agent)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'representante_id',
  })
  policies: PolicyEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => ProductAgentEntity, (productAgent) => productAgent.agent)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'representante_id',
  })
  productAgent: ProductAgentEntity[];
}
