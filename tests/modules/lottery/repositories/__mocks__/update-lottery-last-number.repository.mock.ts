import { LotteryConfigEntity } from 'src/modules/database/models';
import { SeederAbstract } from 'tests/seeder.abstract';
import { Repository } from 'typeorm';

export class UpdateLotteryLastNumberRepositorySeeder extends SeederAbstract {
  lotteryRepository: Repository<LotteryConfigEntity>;

  constructor() {
    super();

    this.lotteryRepository = this.connection.getRepository(LotteryConfigEntity);
  }

  public async seed(lastNumber = 0): Promise<void> {
    await this.lotteryRepository.save({
      initialRange: 87000,
      finalRange: 90000,
      lastNumber,
    });
  }

  public async truncate(): Promise<void> {
    await this.truncateTable(this.lotteryRepository.metadata.tableName);
  }
}
