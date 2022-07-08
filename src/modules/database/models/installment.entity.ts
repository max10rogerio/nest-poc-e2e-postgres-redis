import { InstallmentStatusEnum } from 'src/modules/policy/constants';
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
import { PolicyEntity } from './policy.entity';
import { ColumnNumericTransformer } from './__utils';

@Entity({ name: 'parcelas' })
export class InstallmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero' })
  number: number;

  @Column({
    name: 'valor_total',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  totalValue: number;

  @Column({
    name: 'valor_liquido',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  liquidValue: number;

  @Column({
    name: 'valor_iof',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  iofValue: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: InstallmentStatusEnum,
  })
  status: InstallmentStatusEnum;

  @Column({ name: 'tentativas' })
  attempts: number;

  @Column({ name: 'agencia' })
  agency: string;

  @Column({ name: 'conta' })
  account: string;

  @Column({ name: 'codigo_transacao', nullable: true })
  transactionCode: number;

  @Column({ name: 'apolice_id' })
  policyId: number;

  @Column({
    name: 'data_vencimento',
    type: 'date',
  })
  dueDate: string;

  @Column({
    name: 'pagamento_id',
    nullable: true,
  })
  paymentId: number;

  @Column({
    name: 'request_id',
    nullable: true,
  })
  requestId: string;

  @ManyToOne(() => PolicyEntity, (policy) => policy.installments)
  @JoinColumn({
    name: 'apolice_id',
    referencedColumnName: 'id',
  })
  policy: PolicyEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
