import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateVilnyyDto } from './dto/create-vilnyy.dto';
import { UpdateVilnyyDto } from './dto/update-vilnyy.dto';
import { Vilnyy } from './vilnyy.entity';

@Injectable()
export class VilnyyService {
  constructor(
    @InjectRepository(Vilnyy)
    private vilnyyRepo: Repository<Vilnyy>
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

  async update(vilnyyId: number, vilnyyDto: UpdateVilnyyDto): Promise<UpdateResult> {
    return this.vilnyyRepo.update(vilnyyId, vilnyyDto);
  }

  async delete(vilnyyId: number): Promise<DeleteResult> {
    return this.vilnyyRepo.delete(vilnyyId);
  }
}
