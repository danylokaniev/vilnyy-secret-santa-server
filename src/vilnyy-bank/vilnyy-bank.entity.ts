import { ApiProperty } from '@nestjs/swagger';
import { Vilnyy } from 'src/vilnyy/vilnyy.entity';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class VilnyyBank {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @ManyToOne(() => Vilnyy, (vilnyy) => vilnyy.id, { eager: true })
  @JoinColumn()
  vilnyy?: Vilnyy;
  @Column({ nullable: true })
  vilnyyId: number;

  @ApiProperty()
  @Column()
  goal: number;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
