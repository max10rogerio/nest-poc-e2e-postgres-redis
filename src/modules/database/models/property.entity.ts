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
import { HabitationEntity } from './habitation.entity';
import { PolicyResidentialEntity } from './policy-residential.entity';

@Entity({ name: 'imoveis' })
export class PropertyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_moradia_id' })
  housingTypeId: number;

  @Column({ name: 'tipo_construcao_id' })
  constructionTypeId: number;

  @Column({ name: 'tipo_imovel_id' })
  propertyTypeId: number;

  @ManyToOne(() => HabitationEntity, (habitation) => habitation.housing)
  @JoinColumn({
    name: 'tipo_moradia_id',
    referencedColumnName: 'id',
  })
  housingType: HabitationEntity;

  @ManyToOne(() => HabitationEntity, (habitation) => habitation.constructions)
  @JoinColumn({
    name: 'tipo_construcao_id',
    referencedColumnName: 'id',
  })
  constructionType: HabitationEntity;

  @ManyToOne(() => HabitationEntity, (habitation) => habitation.properties)
  @JoinColumn({
    name: 'tipo_imovel_id',
    referencedColumnName: 'id',
  })
  propertyType: HabitationEntity;

  @OneToMany(() => PolicyResidentialEntity, (policyResidentail) => policyResidentail.property)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'imovel_id',
  })
  policiesResidential: PolicyResidentialEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
