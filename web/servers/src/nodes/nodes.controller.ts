import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guards';
import { RolesGuard } from '../common/guards/roles.guards';
import { Roles } from '../common/decorators/roles.decorators';
import { Role } from '@prisma/client';

@Controller('nodes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NodesController {
  constructor(private readonly nodes: NodesService) {}

  @Get()
  findAll() {
    return this.nodes.findAll();
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: { name: string; serial: string; location?: string }) {
    return this.nodes.create(dto);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.nodes.updateStatus(id, status);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.nodes.remove(id);
  }
}
