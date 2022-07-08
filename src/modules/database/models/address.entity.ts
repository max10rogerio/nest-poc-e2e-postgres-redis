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
import { PolicyResidentialEntity } from './policy-residential.entity';
import { PolicyEntity } from './policy.entity';

@Entity({ name: 'enderecos' })
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'rua' })
  street: string;

  @Column({ name: 'numero' })
  number: string;

  @Column({ name: 'bairro' })
  neighborhood: string;

  @Column({ name: 'complemento', nullable: true })
  complement?: string;

  @Column({ name: 'cidade' })
  city: string;

  @Column({ name: 'uf' })
  uf: string;

  @OneToMany(() => PolicyEntity, (policy) => policy.address)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'endereco_id',
  })
  policy: PolicyEntity[];

  @OneToMany(() => PolicyResidentialEntity, (policyResidentail) => policyResidentail.address)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'endereco_id',
  })
  policiesResidential: PolicyResidentialEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
