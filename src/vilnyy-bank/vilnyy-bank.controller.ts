import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VilnyyBank } from './vilnyy-bank.entity';
import { VilnyyBankService } from './vilnyy-bank.service';

@Controller('vilnyy')
@ApiTags('VilnyyBank')
export class VilnyyBankController {
  constructor(private vilnyyService: VilnyyBankService) {}

  @Get()
  @ApiResponse({ status: 200, type: VilnyyBank, isArray: true })
  getAllVilnyyBanks(): Promise<VilnyyBank[]> {
    return this.vilnyyService.findAll();
  }
}
