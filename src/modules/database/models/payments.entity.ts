import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LogPaymentsEntity } from './log-payments.entity';
import { ColumnNumericTransformer } from './__utils';

@Entity({ name: 'pagamentos' })
export class PaymentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Index()
  @Column({ name: 'cpf', type: 'varchar', length: 14 })
  cpf: string;

  @Column({
    name: 'valor',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  value: number;

  @Column({ name: 'id_log' })
  idLog: number;

  @OneToOne(() => LogPaymentsEntity)
  @JoinColumn({
    name: 'id_log',
    referencedColumnName: 'id',
  })
  logPayment: LogPaymentsEntity;

  @Column({ name: 'seq_lanc', default: 0 })
  seqRelease: number;

  @Column({ name: 'id_lydians', type: 'varchar', length: 36, default: '' })
  idLydians: string;
}
