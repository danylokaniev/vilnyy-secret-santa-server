import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Vilnyy } from 'src/vilnyy/vilnyy.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class VilnyyBank {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ApiProperty()
  @ManyToOne(() => Vilnyy, (vilnyy) => vilnyy.id, { eager: true })
  @JoinColumn()
  vilnyy?: Vilnyy;
  @Column({ nullable: true })
  vilnyyId: string;

  @ApiProperty()
  @Column()
  goal: string;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
