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
import { AddressEntity } from './address.entity';
import { PolicyEntity } from './policy.entity';
import { PropertyEntity } from './property.entity';

@Entity({ name: 'apolices_residenciais' })
export class PolicyResidentialEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'apolice_id' })
  policyId: number;

  @Column({ name: 'endereco_id' })
  addressId: number;

  @Column({ name: 'imovel_id' })
  propertyId: number;

  @ManyToOne(() => PolicyEntity, (policy) => policy.policiesResidential)
  @JoinColumn({
    name: 'apolice_id',
    referencedColumnName: 'id',
  })
  policy: PolicyEntity;

  @ManyToOne(() => AddressEntity, (address) => address.policiesResidential)
  @JoinColumn({
    name: 'endereco_id',
    referencedColumnName: 'id',
  })
  address: AddressEntity;

  @ManyToOne(() => PropertyEntity, (property) => property.policiesResidential)
  @JoinColumn({
    name: 'imovel_id',
    referencedColumnName: 'id',
  })
  property: PropertyEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
