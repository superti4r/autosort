import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MushroomsService } from './mushrooms.service';

@Controller('mushrooms')
export class MushroomsController {
  constructor(private readonly mushrooms: MushroomsService) {}

  @Post()
  create(@Body() dto: { nodeId?: string; createdBy?: string; grade: string; quantity: number }) {
    return this.mushrooms.create(dto);
  }

  @Get()
  getAll(@Query('today') today?: string) {
    return this.mushrooms.findAll(today === 'true');
  }

  @Get('summary')
  summary() {
    return this.mushrooms.summary();
  }
}
