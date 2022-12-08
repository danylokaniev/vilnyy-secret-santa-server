import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVilnyyDto } from './dto/create-vilnyy.dto';
import { Vilnyy } from './vilnyy.entity';

@Injectable()
export class VilnyyService {
  constructor(
    @InjectRepository(Vilnyy)
    private vilnyyRepo: Repository<Vilnyy>,
  ) {}

  findAll(): Promise<Vilnyy[]> {
    return this.vilnyyRepo.find({});
  }

  async create(vilnyyDto: CreateVilnyyDto): Promise<Vilnyy> {
    const vilnyy = new Vilnyy();
    vilnyy.name = vilnyyDto.name;

    vilnyyDto?.address && (vilnyy.address = vilnyyDto.address);
    vilnyyDto?.bankId && (vilnyy.bankId = vilnyyDto.bankId);
    vilnyyDto?.internalId && (vilnyy.internalId = vilnyyDto.internalId);

    return this.vilnyyRepo.save(vilnyy);
  }
}
