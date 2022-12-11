import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { query } from 'express';
import { async } from 'rxjs';
import { Vilnyy } from 'src/vilnyy/vilnyy.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { CreateVilnyyBankDto } from './dto/create-vilnyy-bank.dto';
import { MONO_BANK_API_URL, MONO_BANK_PC } from './vilnyy-bank.constants';
import { VilnyyBank } from './vilnyy-bank.entity';
import { MonoBankResponse, SettledMonoBankPromises } from './vilnyy-bank.interface';

@Injectable()
export class VilnyyBankService {
  constructor(
    @InjectRepository(VilnyyBank)
    private vilnyyBankRepo: Repository<VilnyyBank>,
    @InjectRepository(Vilnyy)
    private vilnyyRepo: Repository<Vilnyy>,
    private httpService: HttpService
  ) {}

  getAllByVilnyyId(vilnyyId: number): Promise<VilnyyBank[]> {
    return this.vilnyyBankRepo.find({ where: { vilnyyId } });
  }

  getLatestBanks(vilnyyIds?: number[]): Promise<VilnyyBank[]> {
    const query = this.vilnyyBankRepo
      .createQueryBuilder('bank')
      .select(['bank.vilnyyId', 'bank.amount', 'bank.goal'])
      .distinctOn(['bank.vilnyyId'])
      .orderBy({ 'bank.vilnyyId': 'ASC', 'bank.createdAt': 'DESC' });

    if (vilnyyIds) {
      query.andWhere('bank.vilnyyId IN (:...vilnyyIds)', {
        vilnyyIds
      });
    } else {
      query.leftJoinAndMapOne('bank.vilnyy', 'bank.vilnyy', 'vilnyy');
    }

    return query.getMany();
  }

  async create(vilnyyBankDto: CreateVilnyyBankDto): Promise<VilnyyBank> {
    const vilnyy = new VilnyyBank();

    vilnyy.vilnyyId = vilnyyBankDto.vilnyyId;
    vilnyy.amount = vilnyyBankDto.amount;
    vilnyy.goal = vilnyyBankDto.goal;

    return this.vilnyyBankRepo.save(vilnyy);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateBanks() {
    const vilnyys = await this.vilnyyRepo.find({
      where: { bankId: Not(IsNull()) }
    });

    const vilnyyBanks = await this.getLatestBanks(vilnyys.map((vil) => vil.id));
    const currentBanks = await this.getCurrentBanks(vilnyys.map((vil) => vil.bankId));

    const updatedBanks: CreateVilnyyBankDto[] = currentBanks
      .map((bank) => ({
        vilnyyId: vilnyys.find((vil) => vil.bankId === bank.bankId).id,
        goal: bank.jarGoal / 100,
        amount: (bank.jarAmount ?? 0) / 100
      }))
      // filter only updated banks
      .filter((newBank) => {
        const prevVilnyyBank = vilnyyBanks.find((bank) => bank.vilnyyId === newBank.vilnyyId);
        return prevVilnyyBank.amount !== newBank.amount || prevVilnyyBank.goal !== newBank.goal;
      });

    if (updatedBanks.length) {
      await this.vilnyyBankRepo.createQueryBuilder().insert().into(VilnyyBank).values(updatedBanks).execute();
    }
  }

  async getCurrentBanks(bankIds: string[]): Promise<MonoBankResponse[]> {
    const requests = [];

    for (const bankId of bankIds) {
      requests.push(this.fetchMonoBank(bankId));
    }

    const responses: SettledMonoBankPromises[] = await Promise.allSettled(requests);
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
