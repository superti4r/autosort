import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { MushroomsService } from './mushrooms.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guards';
import { RolesGuard } from '../common/guards/roles.guards';
import { Roles } from '../common/decorators/roles.decorators';
import { Role } from '@prisma/client';

@Controller('mushrooms')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.ADMIN)
  summary() {
    return this.mushrooms.summary();
  }
}
