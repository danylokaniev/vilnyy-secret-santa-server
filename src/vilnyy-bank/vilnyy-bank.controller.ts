import { CacheInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthGuard } from 'src/guard/auth.guard';
import { VilnyyBank } from './vilnyy-bank.entity';
import { VilnyyBankService } from './vilnyy-bank.service';

@Controller('vilnyy-bank')
@ApiTags('VilnyyBank')
export class VilnyyBankController {
  constructor(private vilnyyBankService: VilnyyBankService) {}

  @Get()
  @ApiResponse({ status: 200, type: VilnyyBank, isArray: true })
  @SkipThrottle()
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

  @Get('updating/status')
  @ApiSecurity('token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: Boolean })
  isBanksUpdating(): boolean {
    return this.vilnyyBankService.isUpdatingBanks;
  }

  @Post('updating/switch')
  @ApiSecurity('token')
  @UseGuards(AuthGuard)
  switchBanksUpdating(): boolean {
    return this.vilnyyBankService.switchUpdatingBanks();
  }
}
