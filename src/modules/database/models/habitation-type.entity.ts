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
import { HabitationEntity } from './habitation.entity';

@Entity({ name: 'tipos_habitacao' })
export class HabitationTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column({ name: 'descricao' })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => HabitationEntity, (habitation) => habitation.habitationType)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'tipos_habitacao_id',
  })
  habitations: HabitationEntity[];
}
