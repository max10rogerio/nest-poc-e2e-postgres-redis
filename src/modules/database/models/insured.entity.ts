import { GenderEnum, MaritalStatusEnum } from 'src/modules/common/constants';
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
import { PolicyEntity } from './policy.entity';

@Entity({ name: 'clientes' })
export class InsuredEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cpf' })
  cpf: string;

  @Column({ name: 'nome' })
  name: string;

  @Column({
    name: 'data_nascimento',
    type: 'date',
  })
  birthDate: Date;

  @Column({
    name: 'genero',
    type: 'enum',
    enum: GenderEnum,
  })
  gender: GenderEnum;

  @Column({
    name: 'estado_civil',
    type: 'enum',
    enum: MaritalStatusEnum,
  })
  maritalStatus: MaritalStatusEnum;

  @Column({ name: 'telefone' })
  telephone: string;

  @Column({ name: 'email' })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => PolicyEntity, (policy) => policy.insured)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'cliente_id',
  })
  policies: PolicyEntity[];
}
