import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVilnyyBankDto } from './dto/create-vilnyy-bank.dto';
import { VilnyyBank } from './vilnyy-bank.entity';

@Injectable()
export class VilnyyBankService {
  constructor(
    @InjectRepository(VilnyyBank)
    private vilnyyRepo: Repository<VilnyyBank>,
  ) {}

  findAll(): Promise<VilnyyBank[]> {
    return this.vilnyyRepo.find({});
  }

  async create(vilnyyBankDto: CreateVilnyyBankDto): Promise<VilnyyBank> {
    const vilnyy = new VilnyyBank();

    vilnyy.vilnyyId = vilnyyBankDto.vilnyyId;
    vilnyy.amount = vilnyyBankDto.amount;
    vilnyy.goal = vilnyyBankDto.goal;

    return this.vilnyyRepo.save(vilnyy);
  }
}
