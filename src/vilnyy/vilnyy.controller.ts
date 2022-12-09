import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBody, ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { DeleteResult } from 'typeorm';
import { CreateVilnyyDto } from './dto/create-vilnyy.dto';
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

  @Post()
  @ApiSecurity('token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'summary', description: 'description' })
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
