import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guards';
import { RolesGuard } from '../common/guards/roles.guards';
import { Roles } from '../common/decorators/roles.decorators';
import { Role } from '@prisma/client';

@Controller('cameras')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CamerasController {
  constructor(private readonly cameras: CamerasService) {}

  @Get(':nodeId')
  findByNode(@Param('nodeId') nodeId: string) {
    return this.cameras.findByNode(nodeId);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: { nodeId: string; name: string; url: string }) {
    return this.cameras.create(dto);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.cameras.updateStatus(id, status);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.cameras.remove(id);
  }
}
