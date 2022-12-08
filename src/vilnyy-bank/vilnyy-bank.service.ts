import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Vilnyy } from 'src/vilnyy/vilnyy.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateVilnyyBankDto } from './dto/create-vilnyy-bank.dto';
import { MONO_BANK_API_URL, MONO_BANK_PC } from './vilnyy-bank.constants';
import { VilnyyBank } from './vilnyy-bank.entity';
import {
  MonoBankResponse,
  SettledMonoBankPromises,
} from './vilnyy-bank.interface';

@Injectable()
export class VilnyyBankService {
  constructor(
    @InjectRepository(VilnyyBank)
    private vilnyyBankRepo: Repository<VilnyyBank>,
    @InjectRepository(Vilnyy)
    private vilnyyRepo: Repository<Vilnyy>,
    private httpService: HttpService,
  ) {}

  findAll(): Promise<VilnyyBank[]> {
    return this.vilnyyBankRepo.find({});
  }

  async create(vilnyyBankDto: CreateVilnyyBankDto): Promise<VilnyyBank> {
    const vilnyy = new VilnyyBank();

    vilnyy.vilnyyId = vilnyyBankDto.vilnyyId;
    vilnyy.amount = vilnyyBankDto.amount;
    vilnyy.goal = vilnyyBankDto.goal;

    return this.vilnyyBankRepo.save(vilnyy);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async addCurrentBanks() {
    const vilnyys = await this.vilnyyRepo.find({
      where: {
        bankId: Not(IsNull()),
      },
    });

    const bankIds = vilnyys.map((vil) => vil.bankId);
    const currentBanks = await this.getCurrentBanks(bankIds);

    const currentBanksDto: CreateVilnyyBankDto[] = currentBanks.map((bank) => ({
      vilnyyId: vilnyys.find((vil) => vil.bankId === bank.bankId).id,
      goal: bank.jarGoal / 100,
      amount: (bank.jarAmount ?? 0) / 100,
    }));

    await this.vilnyyBankRepo
      .createQueryBuilder()
      .insert()
      .into(VilnyyBank)
      .values(currentBanksDto)
      .execute();
  }

  async getCurrentBanks(bankIds: string[]): Promise<MonoBankResponse[]> {
    const requests = [];

    for (const bankId of bankIds) {
      requests.push(this.fetchMonoBank(bankId));
    }

    const responses: SettledMonoBankPromises[] = await Promise.allSettled(
      requests,
    );
    const results: MonoBankResponse[] = [];

    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      if (response.status === 'fulfilled') {
        results.push({ ...response.value, bankId: bankIds[i] });
      }
    }

    return results;
  }

  async fetchMonoBank(vilnyyId: string): Promise<MonoBankResponse> {
    const body = { c: 'hello', clientId: vilnyyId, Pc: MONO_BANK_PC };
    const res = await this.httpService.axiosRef.post(MONO_BANK_API_URL, body);
    return res.data;
  }
}
