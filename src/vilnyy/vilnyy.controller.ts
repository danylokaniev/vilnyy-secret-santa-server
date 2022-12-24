import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBody, ApiTags, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateVilnyyDto } from './dto/create-vilnyy.dto';
import { UpdateVilnyyDto } from './dto/update-vilnyy.dto';
import { Vilnyy } from './vilnyy.entity';
import { VilnyyService } from './vilnyy.service';

@Controller('vilnyy')
@ApiTags('Vilnyy')
export class VilnyyController {
  constructor(private vilnyyService: VilnyyService) {}

  @Get()
  @ApiResponse({ status: 200, type: Vilnyy, isArray: true })
  getAll(): Promise<Vilnyy[]> {
    return this.vilnyyService.findAll();
  }

  @Put('/:id')
  @ApiSecurity('token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: Vilnyy })
  @ApiBody({ type: UpdateVilnyyDto })
  update(@Param('id') id: string, @Body() vilnyyDto: UpdateVilnyyDto): Promise<UpdateResult> {
    return this.vilnyyService.update(Number(id), vilnyyDto);
  }

  @Post()
  @ApiSecurity('token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: Vilnyy })
  @ApiBody({ type: CreateVilnyyDto })
  create(@Body() vilnyyDto: CreateVilnyyDto): Promise<Vilnyy> {
    return this.vilnyyService.create(vilnyyDto);
  }

  @Delete('/:id')
  @ApiSecurity('token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 204 })
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.vilnyyService.delete(Number(id));
  }
}
