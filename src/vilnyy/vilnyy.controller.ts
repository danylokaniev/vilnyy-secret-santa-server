import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateVilnyyDto } from './dto/create-vilnyy.dto';
import { Vilnyy } from './vilnyy.entity';
import { VilnyyService } from './vilnyy.service';

@Controller('vilnyy')
@ApiTags('Vilnyy')
export class VilnyyController {
  constructor(private vilnyyService: VilnyyService) {}

  @Get()
  @ApiResponse({ status: 200, type: Vilnyy, isArray: true })
  getAllVilnyys(): Promise<Vilnyy[]> {
    return this.vilnyyService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'summary', description: 'description' })
  @ApiResponse({ status: 200, type: Vilnyy })
  @ApiBody({ type: CreateVilnyyDto })
  createVilnyy(@Body() vilnyyDto: CreateVilnyyDto): Promise<Vilnyy> {
    return this.vilnyyService.createVilnyy(vilnyyDto);
  }
}
