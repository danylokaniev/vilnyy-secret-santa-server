import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('app')
@ApiTags('App')
export class AppController {
  @Get()
  get(): Record<string, string> {
    return {
      version: '1.0.2'
    };
  }
}
