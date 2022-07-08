import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CoverageEntity } from './coverage.entity';

@Entity({
  name: 'tipos_cobertura',
  orderBy: {
    order: 'ASC',
  },
})
export class CoverageTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'descricao' })
  description: string;

  @Column({ name: 'key', default: 'coverages' })
  key: string;

  @Column({ name: 'ordem', default: 1 })
  order: number;

  @OneToMany(() => CoverageEntity, (coverage) => coverage.coverageType)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'tipos_cobertura_id',
  })
  coverages: CoverageEntity[];
}
