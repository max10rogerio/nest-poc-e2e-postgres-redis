import { AgentTypeEnum } from 'src/modules/policy/constants';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AgentEntity } from './agent.entity';

@Entity({ name: 'tipos_representante' })
export class AgentTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AgentTypeEnum, default: AgentTypeEnum.AGENT })
  key: AgentTypeEnum;

  @Column({ name: 'descricao' })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => AgentEntity, (agent) => agent.agentType)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'tipos_representante_id',
  })
  agents: AgentEntity[];
}
