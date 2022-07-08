import { HabitationEntity, HabitationTypeEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class GetAllHabitationControllerSeeder extends SeederAbstract {
  habitationTypeRepository: Repository<HabitationTypeEntity>;
  habitationRepository: Repository<HabitationEntity>;

  constructor() {
    super();

    this.habitationRepository = this.connection.getRepository(HabitationEntity);
    this.habitationTypeRepository = this.connection.getRepository(HabitationTypeEntity);
  }

  public async seed(): Promise<void> {
    const type = await this.habitationTypeRepository.save({
      description: 'habitation type',
      key: 'test',
    });

    await this.habitationRepository.save({
      code: 'T',
      description: 'Test habitation',
      habitationTypeId: type.id,
    });
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.habitationRepository.metadata.tableName);
    await this.truncateTable(this.habitationTypeRepository.metadata.tableName);
  }
}

export const getExpectedResponse = () => [
  {
    description: 'habitation type',
    key: 'test',
    values: [
      {
        id: 1,
        code: 'T',
        description: 'Test habitation',
      },
    ],
  },
];
