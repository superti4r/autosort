import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { NodesService } from './nodes.service';

@Controller('nodes')
export class NodesController {
  constructor(private readonly nodes: NodesService) {}

  @Get()
  findAll() {
    return this.nodes.findAll();
  }

  @Post()
  create(@Body() dto: { name: string; serial: string; location?: string }) {
    return this.nodes.create(dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.nodes.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodes.remove(id);
  }
}
