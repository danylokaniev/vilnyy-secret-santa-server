import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vilnyy {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ApiProperty()
  @Column()
  @IsString()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  internalId: string;

  @ApiProperty()
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  bankId: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
