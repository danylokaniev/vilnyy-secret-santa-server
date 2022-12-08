import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VilnyyBank } from './vilnyy-bank.entity';
import { VilnyyBankService } from './vilnyy-bank.service';

@Controller('vilnyy-bank')
@ApiTags('VilnyyBank')
export class VilnyyBankController {
  constructor(private vilnyyBankService: VilnyyBankService) {}

  @Get()
  @ApiResponse({ status: 200, type: VilnyyBank, isArray: true })
  getAll(): Promise<VilnyyBank[]> {
    return this.vilnyyBankService.findAll();
  }
}
