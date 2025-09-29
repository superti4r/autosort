import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CamerasService } from './cameras.service';

@Controller('cameras')
export class CamerasController {
  constructor(private readonly cameras: CamerasService) {}

  @Get(':nodeId')
  findByNode(@Param('nodeId') nodeId: string) {
    return this.cameras.findByNode(nodeId);
  }

  @Post()
  create(@Body() dto: { nodeId: string; name: string; url: string }) {
    return this.cameras.create(dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.cameras.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cameras.remove(id);
  }
}
