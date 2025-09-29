import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, ForbiddenException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guards';
import { RolesGuard } from '../common/guards/roles.guards';
import { Roles } from '../common/decorators/roles.decorators';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const requester = req.user;
    if (requester.role !== Role.ADMIN && requester.sub !== id) {
      throw new ForbiddenException('Tidak boleh melihat user lain');
    }
    return this.users.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: { name: string; email: string; password: string; role?: Role }) {
    return this.users.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<{ name: string; email: string; role: Role }>, @Req() req: any) {
    const requester = req.user;
    if (requester.role !== Role.ADMIN && requester.sub !== id) {
      throw new ForbiddenException('Tidak boleh mengedit user lain');
    }
    return this.users.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.users.remove(id);
  }
}
