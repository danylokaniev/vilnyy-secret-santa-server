import { CacheInterceptor, Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { VilnyyBank } from './vilnyy-bank.entity';
import { VilnyyBankService } from './vilnyy-bank.service';

@Controller('vilnyy-bank')
@ApiTags('VilnyyBank')
export class VilnyyBankController {
  constructor(private vilnyyBankService: VilnyyBankService) {}

  @Get()
  @ApiResponse({ status: 200, type: VilnyyBank, isArray: true })
  @UseInterceptors(CacheInterceptor)
  getLatestBanks(): Promise<VilnyyBank[]> {
    return this.vilnyyBankService.getLatestBanks();
  }

  @Get(':vilnyyId')
  @ApiSecurity('token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: VilnyyBank, isArray: true })
  getAllByVilnyyId(@Param('vilnyyId') vilnyyId: string): Promise<VilnyyBank[]> {
    return this.vilnyyBankService.getAllByVilnyyId(Number(vilnyyId));
  }
}
