import { StatusEnum } from 'src/modules/common/constants';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PolicyEntity } from './policy.entity';

@Entity({ name: 'exportacoes' })
export class ExportEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'tipo',
    type: 'enum',
    enum: ExportTypeEnum,
  })
  type: ExportTypeEnum;

  @Column({ name: 'log' })
  log: string;

  @Column({ name: 'arquivo' })
  file: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: StatusEnum,
  })
  status: StatusEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => PolicyEntity, (policy) => policy.export)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'exportacao_id',
  })
  policies: PolicyEntity[];
}
