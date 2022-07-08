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
import { HabitationTypeEntity } from './habitation-type.entity';
import { PropertyEntity } from './property.entity';

@Entity({ name: 'habitacao' })
export class HabitationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'codigo', unique: true, length: 2 })
  code: string;

  @Column({ name: 'descricao' })
  description: string;

  @Column({ name: 'tipos_habitacao_id' })
  habitationTypeId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => HabitationTypeEntity, (habitationType) => habitationType.habitations)
  @JoinColumn({
    name: 'tipos_habitacao_id',
    referencedColumnName: 'id',
  })
  habitationType: HabitationTypeEntity;

  @OneToMany(() => PropertyEntity, (property) => property.housingType)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'tipo_moradia_id',
  })
  housing: PropertyEntity[];

  @OneToMany(() => PropertyEntity, (property) => property.constructionType)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'tipo_construcao_id',
  })
  constructions: PropertyEntity[];

  @OneToMany(() => PropertyEntity, (property) => property.propertyType)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'tipo_imovel_id',
  })
  properties: PropertyEntity[];
}
